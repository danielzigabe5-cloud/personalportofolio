import { get, put } from '@vercel/blob'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const dataDirectory = join(process.cwd(), 'data')
const blobPrefix = 'portfolio-data/'

export async function readJsonData<T>(key: string, fallback: T): Promise<T> {
  if (usesBlobStorage()) {
    assertBlobStorageConfigured()
    const stored = await get(`${blobPrefix}${key}`, { access: 'private', useCache: false })
    if (stored) {
      if (stored.statusCode !== 200) throw new Error(`Could not read stored data: ${key}`)
      return JSON.parse(await new Response(stored.stream).text()) as T
    }
  } else {
    try {
      return JSON.parse(await readFile(join(dataDirectory, key), 'utf8')) as T
    } catch (error) {
      if (!isFileNotFound(error)) throw error
    }
  }

  const bundledData = await useStorage('assets:server').getItem<T>(key)
  return bundledData ?? fallback
}

export async function writeJsonData<T>(key: string, value: T): Promise<void> {
  if (usesBlobStorage()) {
    assertBlobStorageConfigured()
    await put(`${blobPrefix}${key}`, JSON.stringify(value), {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
      cacheControlMaxAge: 60
    })
    return
  }

  await mkdir(dataDirectory, { recursive: true })
  await writeFile(join(dataDirectory, key), JSON.stringify(value, null, 2), 'utf8')
}

function usesBlobStorage(): boolean {
  return process.env.VERCEL === '1' || Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

function assertBlobStorageConfigured(): void {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('Persistent admin data storage is not configured. Set BLOB_READ_WRITE_TOKEN.')
  }
}

function isFileNotFound(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT'
}
