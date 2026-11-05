import { del, list, put } from '@vercel/blob'
import { randomUUID } from 'node:crypto'
import { mkdir, readFile, readdir, unlink, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

export interface MediaFile {
  id: string
  name: string
  size: number
  date: string
  url: string
  extension: string
  mimeType: string
  kind: 'image' | 'document'
}

const supportedFormats = {
  pdf: { mimeType: 'application/pdf', kind: 'document' },
  ppt: { mimeType: 'application/vnd.ms-powerpoint', kind: 'document' },
  pptx: { mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', kind: 'document' },
  jpg: { mimeType: 'image/jpeg', kind: 'image' },
  jpeg: { mimeType: 'image/jpeg', kind: 'image' },
  png: { mimeType: 'image/png', kind: 'image' },
  gif: { mimeType: 'image/gif', kind: 'image' },
  webp: { mimeType: 'image/webp', kind: 'image' }
} as const

type MediaExtension = keyof typeof supportedFormats

const mediaDirectory = join(process.cwd(), 'data', 'media')
const blobPrefix = 'portfolio-media/'

export function usesBlobMediaStorage(): boolean {
  return process.env.VERCEL === '1' ||
    Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

export async function listMediaFiles(): Promise<MediaFile[]> {
  if (usesBlobMediaStorage()) {
    assertBlobStorageConfigured()
    const files: MediaFile[] = []
    let cursor: string | undefined

    do {
      const result = await list({ prefix: blobPrefix, cursor })
      for (const blob of result.blobs) {
        const [, id, encodedName] = blob.pathname.split('/')
        if (!id || !isMediaId(id) || !encodedName) continue

        const name = decodeURIComponent(encodedName)
        const format = getMediaFormat(name)
        if (!format) continue
        files.push({
          id,
          name,
          size: blob.size,
          date: blob.uploadedAt.toISOString(),
          url: blob.url,
          ...format
        })
      }
      cursor = result.hasMore ? result.cursor : undefined
    } while (cursor)

    return files.sort((a, b) => b.date.localeCompare(a.date))
  }

  await mkdir(mediaDirectory, { recursive: true })
  const entries = await readdir(mediaDirectory)
  const records = await Promise.all(
    entries
      .filter(entry => entry.endsWith('.json'))
      .map(entry => readFile(join(mediaDirectory, entry), 'utf8'))
  )

  return records
    .map((record) => {
      const saved = JSON.parse(record) as Partial<MediaFile> & Pick<MediaFile, 'id' | 'name' | 'size' | 'date' | 'url'>
      const format = getMediaFormat(saved.name)
      if (!format) throw new Error(`Unsupported stored media format: ${saved.name}`)
      return {
        ...saved,
        extension: format.extension,
        mimeType: format.mimeType,
        kind: format.kind
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

export async function saveMediaFile(name: string, data: Buffer): Promise<MediaFile> {
  const format = getMediaFormat(name)
  if (!format) throw new Error(`Unsupported media format: ${name}`)

  const id = randomUUID()
  if (usesBlobMediaStorage()) {
    assertBlobStorageConfigured()
    const blob = await put(`${blobPrefix}${id}/${encodeURIComponent(name)}`, data, {
      access: 'public',
      addRandomSuffix: false,
      contentType: format.mimeType,
      maximumSizeInBytes: 10 * 1024 * 1024
    })
    return {
      id,
      name,
      size: data.byteLength,
      date: new Date().toISOString(),
      url: blob.url,
      ...format
    }
  }

  await mkdir(mediaDirectory, { recursive: true })
  const file: MediaFile = {
    id,
    name,
    size: data.byteLength,
    date: new Date().toISOString(),
    url: `/api/media/${id}`,
    extension: format.extension,
    mimeType: format.mimeType,
    kind: format.kind
  }

  await writeFile(join(mediaDirectory, `${id}.${format.extension}`), data, { flag: 'wx' })
  try {
    await writeFile(join(mediaDirectory, `${id}.json`), JSON.stringify(file), { flag: 'wx' })
  } catch (error) {
    await unlink(join(mediaDirectory, `${id}.${format.extension}`))
    throw error
  }

  return file
}

export async function getMediaFile(id: string): Promise<{ metadata: MediaFile; data: Buffer } | null> {
  if (!isMediaId(id)) return null

  if (usesBlobMediaStorage()) {
    const metadata = (await listMediaFiles()).find(file => file.id === id)
    if (!metadata) return null

    const response = await fetch(metadata.url)
    if (!response.ok) throw new Error(`Could not read stored media (${response.status}).`)
    return { metadata, data: Buffer.from(await response.arrayBuffer()) }
  }

  try {
    const metadata = JSON.parse(await readFile(join(mediaDirectory, `${id}.json`), 'utf8')) as Partial<MediaFile> & Pick<MediaFile, 'id' | 'name' | 'size' | 'date' | 'url'>
    const format = getMediaFormat(metadata.name)
    if (!format) return null

    const data = await readFile(join(mediaDirectory, `${id}.${format.extension}`))
    return {
      metadata: { ...metadata, ...format },
      data
    }
  } catch (error) {
    if (isFileNotFound(error)) return null
    throw error
  }
}

export async function deleteMediaFile(id: string): Promise<boolean> {
  if (!isMediaId(id)) return false

  if (usesBlobMediaStorage()) {
    assertBlobStorageConfigured()
    const file = (await listMediaFiles()).find(item => item.id === id)
    if (!file) return false
    await del(file.url)
    return true
  }

  const file = await getMediaFile(id)
  if (!file) return false

  try {
    await Promise.all([
      unlink(join(mediaDirectory, `${id}.${file.metadata.extension}`)),
      unlink(join(mediaDirectory, `${id}.json`))
    ])
    return true
  } catch (error) {
    if (isFileNotFound(error)) return false
    throw error
  }
}

function assertBlobStorageConfigured(): void {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('Persistent uploads are not configured. Connect a Vercel Blob store and set BLOB_READ_WRITE_TOKEN in the deployment environment.')
  }
}

export function getMediaFormat(name: string) {
  const extension = name.split('.').pop()?.toLowerCase()
  if (!extension || !Object.prototype.hasOwnProperty.call(supportedFormats, extension)) return null
  const format = supportedFormats[extension as MediaExtension]
  return { extension: extension as MediaExtension, ...format }
}

export function hasValidMediaSignature(extension: string, data: Buffer): boolean {
  switch (extension) {
    case 'pdf':
      return data.subarray(0, 1024).includes(Buffer.from('%PDF-'))
    case 'ppt':
      return data.subarray(0, 8).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]))
    case 'pptx':
      return data.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 0x03, 0x04]))
    case 'jpg':
    case 'jpeg':
      return data.length >= 3 && data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff
    case 'png':
      return data.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    case 'gif':
      return data.subarray(0, 6).toString('ascii') === 'GIF87a' || data.subarray(0, 6).toString('ascii') === 'GIF89a'
    case 'webp':
      return data.length >= 12 && data.subarray(0, 4).toString('ascii') === 'RIFF' && data.subarray(8, 12).toString('ascii') === 'WEBP'
    default:
      return false
  }
}

function isMediaId(id: string): boolean {
  return /^[\da-f]{8}-(?:[\da-f]{4}-){3}[\da-f]{12}$/i.test(id)
}

function isFileNotFound(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT'
}
