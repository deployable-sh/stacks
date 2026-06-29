import type { AppBase } from './index';

export const actual: AppBase = {
  slug: 'actual',
  name: 'Actual Budget',
  upstream: 'Actual Budget',
  upstreamUrl: 'https://actualbudget.org',
  tagline: 'Local-first envelope budgeting - end-to-end encrypted, synced by a $5 server you own.',
  category: 'Productivity & PM',
  status: 'stable',
  seoTitle: 'Self-host Actual Budget: open-source envelope budgeting',
  seoDescription:
    'Deploy Actual Budget - local-first envelope budgeting with end-to-end encrypted sync - in one step for $5/month. The open-source YNAB alternative.',
  keywords: [
    'self-host actual budget',
    'actual budget docker compose',
    'ynab alternative open source',
    'envelope budgeting self-hosted',
    'actual server setup',
    'private finance app',
  ],
  intro: [
    'Actual is the YNAB methodology - envelope budgeting where every dollar gets a job - rebuilt as MIT open source with a privacy spine: budgets live ON your devices, end-to-end encrypted, and this little server only syncs ciphertext between them. PikaPods features it on their homepage for a reason.',
    'One tiny container, one volume, one first-visit ritual: set the server password before anyone else finds the URL. Bank data comes in via file imports or community bank-sync bridges; your finances stay yours, portably, forever.',
  ],
  features: [
    'Envelope budgeting (the YNAB method) with reports and schedules',
    'End-to-end encryption: the server stores only ciphertext',
    'Syncs browser, desktop, and mobile apps',
    'File imports (OFX/QFX/CSV) + community bank-sync bridges',
    'MIT, tiny, beloved',
  ],
  topology: [{ service: 'actual', role: 'sync server + web app (:5000)', isPublic: 'yes - set the password on first visit' }],
  requiredVars: [],
  ramMiB: 256,
  diskGB: 2,
  services: 1,
  sizingNote: 'Finances are kilobytes. Set the server password immediately on first visit - until then the instance is claimable.',
  faq: [
    {
      q: 'How does this compare to YNAB?',
      a: 'Same envelope methodology; YNAB charges ~$110/year and holds your data. Actual is $5/month of server (which can share a plan with everything else here), with budgets end-to-end encrypted - the server operator (you, but it matters on principle) cannot read them.',
    },
    {
      q: 'What does end-to-end encryption mean here?',
      a: 'Budget files encrypt on your device with a key derived from your password; the server syncs blobs it cannot decrypt. Lose the password and even you cannot recover the data - the trade of real E2EE, stated plainly.',
    },
    {
      q: 'Can my partner and I share a budget?',
      a: 'Yes - the same budget file syncs to multiple devices with the shared password. Separate budgets on one server work too; each file has its own encryption.',
    },
  ],
};
