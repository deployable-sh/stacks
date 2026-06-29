import type { AppBase } from './index';

export const dockerRegistry: AppBase = {
  slug: 'docker-registry',
  name: 'Docker Registry',
  upstream: 'CNCF Distribution',
  upstreamUrl: 'https://distribution.github.io/distribution/',
  tagline: 'Your own private container registry - images on a Miget Bucket, unlimited repos, no pull-rate caps.',
  category: 'Dev Tools',
  status: 'stable',
  seoTitle: 'Self-host a private Docker Registry on object storage',
  seoDescription:
    'Deploy the CNCF Distribution registry - the engine behind Docker Hub - with https, basic-auth, and image storage on a Miget Bucket. Unlimited private repos and no pull-rate limits for one small plan plus Bucket storage.',
  keywords: [
    'self-host docker registry',
    'private container registry',
    'docker hub alternative',
    'distribution registry s3',
    'ghcr alternative self-hosted',
    'private oci registry',
  ],
  intro: [
    'This is your own private container registry - the CNCF Distribution registry, the same engine that runs behind Docker Hub - so you can push and pull images over https on your own domain, with basic-auth, and no rate limits.',
    'Image layers are stored on a Miget Bucket (S3-compatible), which means the registry service itself holds no state: redeploys and rollbacks keep every image, and storage scales independently. A thin wrapper writes a clean config from environment variables at boot and builds an htpasswd file from your credentials, so the registry is never accidentally left open.',
    'It pairs naturally with the catalogue’s CI runners (GitHub, GitLab, Forgejo, Buildkite, Azure Pipelines): build images in a runner, push them here, deploy them anywhere - all inside your own infrastructure, with no Docker Hub pull-rate throttling on your deploys.',
  ],
  features: [
    'CNCF Distribution registry - the Docker Hub engine, self-hosted',
    'Image layers on a Miget Bucket - the service is stateless',
    'Basic-auth via htpasswd, generated from env at boot',
    'Listens natively on port 5000, no proxy wrapper',
    'Unlimited private repositories, no pull-rate limits',
    'Apache-2.0; OCI-compliant, works with any registry client',
  ],
  topology: [
    { service: 'registry', role: 'registry API (:5000)', isPublic: 'yes' },
    { service: 'bucket', role: 'Miget Bucket (image layers)', isPublic: 'no' },
  ],
  requiredVars: [
    { name: 'REGISTRY_AUTH_PASSWORD', what: 'basic-auth password (with REGISTRY_AUTH_USER)' },
    { name: 'REGISTRY_STORAGE_S3_*', what: 'a Miget Bucket: endpoint, bucket, key, secret' },
  ],
  ramMiB: 256,
  diskGB: 10,
  services: 1,
  sizingNote: 'The registry is a thin Go service - 256 MiB is plenty even under concurrent pushes. With S3 storage it keeps no local disk; capacity is the Bucket.',
  faq: [
    {
      q: 'What does this save vs Docker Hub or GitHub Packages?',
      a: 'Docker Hub’s Pro plan is $9/user/month and it meters pull rates; GitHub Packages bills private storage and egress. A self-hosted registry is one small plan (around $5-13/month) plus Bucket storage, with unlimited private repos and no pull throttling.',
    },
    {
      q: 'Why does it need a wrapper instead of the stock image?',
      a: 'Miget configures images through environment variables only, and the stock image ships a filesystem config that conflicts with S3 settings. The wrapper writes a clean config.yml from env (filesystem or S3) and generates the htpasswd file, so the registry comes up correctly and never open by accident.',
    },
    {
      q: 'Can my CI push to it?',
      a: 'Yes. Run `docker login your-app.migetapp.com` with the credentials you set, then push and pull as normal. The catalogue’s CI runners can build and push images to it inside your own network.',
    },
  ],
};
