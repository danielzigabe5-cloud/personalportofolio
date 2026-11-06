import { createHmac, randomBytes, scrypt, scryptSync, timingSafeEqual } from 'node:crypto'
import { createError, getCookie, setCookie, deleteCookie, type H3Event } from 'h3'
import { readJsonData, writeJsonData } from './json-storage'

const COOKIE_NAME = 'auth_token'
const SESSION_TTL_SECONDS = 60 * 60 * 8
const SCRYPT_KEY_LENGTH = 64
const SCRYPT_OPTIONS = { N: 16_384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }

interface AdminConfiguration {
  email: string
  passwordHash: Buffer
  salt: Buffer
  sessionSecret: string
}

interface AdminCredentialOverride {
  email: string
  passwordHash: string
  sessionSecret: string
}

const configurationError = () =>
  createError({
    statusCode: 503,
    statusMessage: 'Admin login is not configured on the server.'
  })

const getAdminConfiguration = async (event: H3Event): Promise<AdminConfiguration> => {
  const config = useRuntimeConfig(event)
  const override = await readJsonData<AdminCredentialOverride | null>('admin-credentials.json', null)
  const email = (override?.email ?? (typeof config.adminEmail === 'string' ? config.adminEmail : '')).trim().toLowerCase()
  const encodedHash = override?.passwordHash ?? (typeof config.adminPasswordHash === 'string' ? config.adminPasswordHash : '')
  const sessionSecret = override?.sessionSecret ?? (typeof config.adminSessionSecret === 'string' ? config.adminSessionSecret : '')
  const parts = encodedHash.split('$')

  if (
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    sessionSecret.length < 32 ||
    parts.length !== 6 ||
    parts[0] !== 'scrypt' ||
    parts[1] !== String(SCRYPT_OPTIONS.N) ||
    parts[2] !== String(SCRYPT_OPTIONS.r) ||
    parts[3] !== String(SCRYPT_OPTIONS.p) ||
    !parts[4] ||
    !parts[5] ||
    !/^[A-Za-z0-9_-]+$/.test(parts[4]) ||
    !/^[A-Za-z0-9_-]+$/.test(parts[5])
  ) {
    throw configurationError()
  }

  const salt = Buffer.from(parts[4], 'base64url')
  const passwordHash = Buffer.from(parts[5], 'base64url')
  if (salt.length < 16 || passwordHash.length !== SCRYPT_KEY_LENGTH) {
    throw configurationError()
  }

  return { email, passwordHash, salt, sessionSecret }
}

const derivePasswordHash = (password: string, salt: Buffer) =>
  new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, SCRYPT_KEY_LENGTH, SCRYPT_OPTIONS, (error, derivedKey) => {
      if (error) {
        reject(createError({
          statusCode: 500,
          statusMessage: 'Could not verify admin credentials.'
        }))
        return
      }
      resolve(derivedKey)
    })
  })

const sign = (payload: string, secret: string) =>
  createHmac('sha256', secret).update(payload).digest('base64url')

const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/'
})

export const verifyAdminCredentials = async (
  event: H3Event,
  email: string,
  password: string
) => {
  const config = await getAdminConfiguration(event)
  const derivedPasswordHash = await derivePasswordHash(password, config.salt)
  const validPassword = timingSafeEqual(derivedPasswordHash, config.passwordHash)
  return email.trim().toLowerCase() === config.email && validPassword
}

export const createAdminSession = async (event: H3Event) => {
  const { sessionSecret } = await getAdminConfiguration(event)
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  const payload = `${expiresAt}.${randomBytes(32).toString('base64url')}`
  const token = `${payload}.${sign(payload, sessionSecret)}`

  setCookie(event, COOKIE_NAME, token, {
    ...cookieOptions(),
    maxAge: SESSION_TTL_SECONDS
  })
}

export const isAdminAuthenticated = async (event: H3Event) => {
  const token = getCookie(event, COOKIE_NAME)
  if (!token) return false

  const [expiresAtValue, nonce, signature, ...extraParts] = token.split('.')
  if (!expiresAtValue || !nonce || !signature || extraParts.length > 0) return false

  const expiresAt = Number(expiresAtValue)
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false

  const { sessionSecret } = await getAdminConfiguration(event)
  const expectedSignature = sign(`${expiresAtValue}.${nonce}`, sessionSecret)
  const actualBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expectedSignature)
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer)
}

export const clearAdminSession = (event: H3Event) => {
  deleteCookie(event, COOKIE_NAME, cookieOptions())
}

export const changeAdminPassword = async (
  event: H3Event,
  currentPassword: string,
  newPassword: string
) => {
  const config = await getAdminConfiguration(event)
  const currentHash = await derivePasswordHash(currentPassword, config.salt)
  if (!timingSafeEqual(currentHash, config.passwordHash)) {
    throw createError({ statusCode: 401, statusMessage: 'Current password is incorrect.' })
  }

  const salt = randomBytes(16)
  const passwordHash = scryptSync(newPassword, salt, SCRYPT_KEY_LENGTH, SCRYPT_OPTIONS)
  const encodedHash = [
    'scrypt',
    SCRYPT_OPTIONS.N,
    SCRYPT_OPTIONS.r,
    SCRYPT_OPTIONS.p,
    salt.toString('base64url'),
    passwordHash.toString('base64url')
  ].join('$')

  await writeCredentialOverride({
    email: config.email,
    passwordHash: encodedHash,
    sessionSecret: randomBytes(32).toString('base64url')
  })
}

export const revokeAllAdminSessions = async (event: H3Event) => {
  const config = await getAdminConfiguration(event)
  const encodedHash = [
    'scrypt',
    SCRYPT_OPTIONS.N,
    SCRYPT_OPTIONS.r,
    SCRYPT_OPTIONS.p,
    config.salt.toString('base64url'),
    config.passwordHash.toString('base64url')
  ].join('$')

  await writeCredentialOverride({
    email: config.email,
    passwordHash: encodedHash,
    sessionSecret: randomBytes(32).toString('base64url')
  })
}

const writeCredentialOverride = async (override: AdminCredentialOverride) => {
  await writeJsonData('admin-credentials.json', override)
}
