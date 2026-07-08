import type { AppBase } from './index';

export const vaultwarden: AppBase = {
  slug: 'vaultwarden',
  name: 'Vaultwarden',
  upstream: 'Vaultwarden',
  upstreamUrl: 'https://github.com/dani-garcia/vaultwarden',
  license: 'AGPL-3.0',
  licenseTier: 'network',
  tagline:
    'The Bitwarden-compatible server in Rust - official clients work unchanged, every premium feature included, 256 MiB of RAM.',
  category: 'Security',
  status: 'stable',
  seoTitle: 'Self-host Vaultwarden: Bitwarden-compatible password server',
  seoDescription:
    'Deploy Vaultwarden - the lightweight Bitwarden-compatible password manager server - in one step for $5/month. Official Bitwarden apps and extensions connect unchanged; unlimited users.',
  keywords: [
    'self-host vaultwarden',
    'vaultwarden docker compose',
    'bitwarden self-hosted',
    'bitwarden alternative server',
    'password manager self-hosted',
    'vaultwarden setup',
  ],
  intro: [
    'Vaultwarden reimplements the Bitwarden server API in Rust - so the polished official clients (browser extensions, iOS/Android apps, desktop, CLI) connect to your server unchanged, while the server itself shrinks from Bitwarden’s multi-container official stack to one binary idling at a few dozen megabytes.',
    'Features that are paid tiers on bitwarden.com - TOTP authenticator, file attachments, emergency access, organizations with collections - are simply included. SQLite, attachments, and keys live on one small volume; websocket notifications ride the main port.',
    'Passwords are the one workload where self-hosting is also a sovereignty statement: the encrypted vaults sit on your volume, end-to-end encrypted by the clients, and the hardening path (close signups, hash the admin token, back up the volume) is three steps in the README.',
  ],
  features: [
    'Full Bitwarden client compatibility: extensions, mobile, desktop, CLI',
    'Premium features included: TOTP, attachments, emergency access, orgs',
    'Rust + SQLite: idles around 50 MiB - the lightest stack on this site',
    'Websocket sync notifications on the main port',
    'Optional /admin page gated by an argon2-hashed token',
    'End-to-end encrypted by design - the server never sees plaintext',
  ],
  topology: [
    { service: 'vaultwarden', role: 'Bitwarden-compatible API + web vault (:5000)', isPublic: 'yes (HTTPS via platform ingress)' },
  ],
  requiredVars: [
    { name: 'DOMAIN', what: 'set to the app’s https URL after first deploy - WebAuthn and email links embed it' },
    { name: 'SIGNUPS_ALLOWED', what: 'set false after creating your accounts (org invitations keep working)' },
  ],
  ramMiB: 256,
  diskGB: 2,
  services: 1,
  sizingNote:
    '256 MiB is generous - Vaultwarden routinely serves whole teams from less. The volume holds the encrypted vaults: back it up.',
  faq: [
    {
      q: 'Do the official Bitwarden apps really work with it?',
      a: 'Yes - set your server URL to your Vaultwarden domain in any official Bitwarden client and log in. The API compatibility is the whole project; millions of users run exactly this setup.',
    },
    {
      q: 'How does the cost compare to Bitwarden or 1Password for a team?',
      a: 'Bitwarden Teams is $4/user/month ($40 for ten people), 1Password Business about $80 for ten. Vaultwarden is $5/month flat regardless of team size, with the premium features included. The trade: you operate and back it up.',
    },
    {
      q: 'Is self-hosting passwords safe?',
      a: 'The encryption model helps you: vaults are end-to-end encrypted by the clients, so the server only ever stores ciphertext. Your responsibilities are availability and backups - keep HTTPS on (the platform ingress does), close signups after onboarding, hash the admin token, and back up the volume.',
    },
    {
      q: 'What happens if my server is down - am I locked out?',
      a: 'No. Bitwarden clients cache the encrypted vault locally, so reading credentials keeps working offline; you only need the server up to sync changes and onboard new devices.',
    },
  ],
};
