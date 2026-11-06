import { randomBytes, scryptSync } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import { emitKeypressEvents } from 'node:readline'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordOptions = { N: 16_384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }

const prompt = (message) => new Promise((resolve) => {
  process.stdout.write(message)
  process.stdin.resume()
  process.stdin.once('data', (data) => resolve(data.toString().trim()))
})

const promptPassword = (message) => {
  if (!process.stdin.isTTY || typeof process.stdin.setRawMode !== 'function') {
    throw new Error('Run this setup command in an interactive terminal.')
  }

  emitKeypressEvents(process.stdin)
  process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdout.write(message)

  return new Promise((resolve, reject) => {
    let password = ''

    const cleanup = () => {
      process.stdin.off('keypress', onKeypress)
      process.stdin.setRawMode(false)
      process.stdout.write('\n')
    }

    const onKeypress = (character, key = {}) => {
      if (key.ctrl && key.name === 'c') {
        cleanup()
        reject(new Error('Admin setup cancelled.'))
        return
      }

      if (key.name === 'return' || key.name === 'enter') {
        cleanup()
        resolve(password)
        return
      }

      if (key.name === 'backspace' || key.name === 'delete') {
        password = password.slice(0, -1)
        return
      }

      if (character && !key.ctrl && !key.meta) {
        password += character
      }
    }

    process.stdin.on('keypress', onKeypress)
  })
}

const setEnvValue = (lines, name, value) => {
  const line = `${name}=${JSON.stringify(value)}`
  const index = lines.findIndex(existing => new RegExp(`^\\s*(?:export\\s+)?${name}\\s*=`).test(existing))
  if (index === -1) {
    lines.push(line)
  } else {
    lines[index] = line
  }
}

try {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error('Run this setup command in an interactive terminal.')
  }

  const email = (await prompt('Admin email: ')).toLowerCase()
  if (!emailPattern.test(email)) {
    throw new Error('Enter a valid email address.')
  }

  const password = await promptPassword('Admin password (hidden): ')
  if (password.length < 12) {
    throw new Error('Use an admin password with at least 12 characters.')
  }

  const confirmation = await promptPassword('Confirm admin password (hidden): ')
  if (password !== confirmation) {
    throw new Error('The passwords do not match.')
  }

  const salt = randomBytes(16)
  const hash = scryptSync(password, salt, 64, passwordOptions)
  const passwordHash = [
    'scrypt',
    passwordOptions.N,
    passwordOptions.r,
    passwordOptions.p,
    salt.toString('base64url'),
    hash.toString('base64url')
  ].join('$')
  const sessionSecret = randomBytes(32).toString('base64url')

  let existingEnv = ''
  try {
    existingEnv = await readFile('.env', 'utf8')
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }

  const lines = existingEnv ? existingEnv.split(/\r?\n/) : []
  for (const [name, value] of [
    ['NUXT_ADMIN_EMAIL', email],
    ['NUXT_ADMIN_PASSWORD_HASH', passwordHash],
    ['NUXT_ADMIN_SESSION_SECRET', sessionSecret]
  ]) {
    setEnvValue(lines, name, value)
  }

  await writeFile('.env', `${lines.join('\n').replace(/\n+$/, '')}\n`, { encoding: 'utf8', mode: 0o600 })
  process.stdout.write('Admin configuration saved to the git-ignored .env file. Restart the Nuxt server to use it.\n')
} catch (error) {
  process.stderr.write(`${error.message}\n`)
  process.exitCode = 1
} finally {
  if (process.stdin.isTTY && typeof process.stdin.setRawMode === 'function') {
    process.stdin.setRawMode(false)
  }
  process.stdin.pause()
}
