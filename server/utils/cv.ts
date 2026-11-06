import { put } from '@vercel/blob'
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { readJsonData, writeJsonData } from './json-storage'

interface CVRecord {
  name: string
  size: number
  updatedAt: string
  url?: string
}

export interface CVMetadata {
  name: string
  size: number
  updatedAt: string
  url: string
}

const cvName = 'Daniel_Zigabe_CV.pdf'
const localCVPath = join(process.cwd(), 'data', 'cv.pdf')
const originalCVPath = join(process.cwd(), 'public', 'Daniel Zigabe - Professional CV.pdf')
const blobPath = 'portfolio-cv/current.pdf'

export async function saveCV(data: Buffer): Promise<CVMetadata> {
  const updatedAt = new Date().toISOString()
  if (usesBlobStorage()) {
    const blob = await put(blobPath, data, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/pdf'
    })
    const record = { name: cvName, size: data.byteLength, updatedAt, url: blob.url }
    await writeJsonData('cv.json', record)
    return { ...record, url: '/api/cv' }
  }

  await mkdir(join(process.cwd(), 'data'), { recursive: true })
  await writeFile(localCVPath, data)
  const record = { name: cvName, size: data.byteLength, updatedAt }
  await writeJsonData('cv.json', record)
  return { ...record, url: '/api/cv' }
}

export async function getCVMetadata(): Promise<CVMetadata> {
  const record = await readJsonData<CVRecord | null>('cv.json', null)
  if (record) return { ...record, url: '/api/cv' }

  try {
    const file = await stat(originalCVPath)
    return {
      name: cvName,
      size: file.size,
      updatedAt: file.mtime.toISOString(),
      url: '/api/cv'
    }
  } catch (error) {
    if (isFileNotFound(error)) {
      return { name: cvName, size: 0, updatedAt: '', url: '/api/cv' }
    }
    throw error
  }
}

export async function getCVContent(): Promise<{ data: Buffer } | { redirectUrl: string } | null> {
  const record = await readJsonData<CVRecord | null>('cv.json', null)
  if (record?.url) return { redirectUrl: record.url }

  for (const path of [localCVPath, originalCVPath]) {
    try {
      return { data: await readFile(path) }
    } catch (error) {
      if (!isFileNotFound(error)) throw error
    }
  }

  return null
}

function usesBlobStorage(): boolean {
  return process.env.VERCEL === '1' || Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

function isFileNotFound(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT'
}
