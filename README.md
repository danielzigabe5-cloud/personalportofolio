# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Admin authentication

Admin authentication uses the single administrator email and scrypt password hash configured on the server. It does not use the Prisma `User` table; the current local MySQL database is not configured/reachable, and there is no OAuth callback in this project.

For local development, run `npm run admin:setup` in an interactive terminal. It prompts for an admin email and password (password input is hidden), writes only the scrypt hash and a random session secret to the git-ignored `.env`, and preserves other `.env` settings. Restart the Nuxt server afterward.

- `NUXT_ADMIN_EMAIL`: administrator email address.
- `NUXT_ADMIN_PASSWORD_HASH`: password hash in the format `scrypt$16384$8$1$<salt-base64url>$<hash-base64url>`.
- `NUXT_ADMIN_SESSION_SECRET`: a private random secret of at least 32 characters used to sign sessions.

For production, set all three `NUXT_ADMIN_*` values using your hosting provider's secret manager. Generate a compatible password hash using a local Node script with `node:crypto` scrypt (`N=16384`, `r=8`, `p=1`, 64-byte output, and a random 16-byte salt). Never prefix these variables with `NUXT_PUBLIC_` or commit them to source control. The admin session is held in an HTTP-only cookie and expires after eight hours.

The admin Settings page verifies the current password before changing it, stores only a new scrypt hash, and invalidates existing sessions. “Log out all devices” rotates the session signing secret. Local credential overrides are written to the git-ignored `data/admin-credentials.json`; deployments using Vercel should configure `BLOB_READ_WRITE_TOKEN` so private settings persist across serverless instances. CV uploads are PDF-only (10 MB maximum), replace the public CV used by the Home and About pages, and use local `data/` storage or Vercel Blob when configured.
