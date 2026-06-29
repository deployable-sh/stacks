import type { AppBase } from './index';

export const mongodb: AppBase = {
  slug: 'mongodb',
  name: 'MongoDB Replica Set',
  upstream: 'MongoDB',
  upstreamUrl: 'https://www.mongodb.com',
  tagline:
    '3-node MongoDB 8 replica set (rs0) on the stock image - self-initiating, internal-only, Atlas-shaped without the Atlas bill.',
  category: 'Databases',
  status: 'stable',
  seoTitle: 'Self-host MongoDB: 3-node replica set with Docker Compose',
  seoDescription:
    'Deploy a 3-node MongoDB 8 replica set in one step - stock mongo image, automatic rs.initiate, per-node volumes. A real HA topology for a fraction of MongoDB Atlas M10 pricing.',
  keywords: [
    'self-host mongodb',
    'mongodb replica set docker compose',
    'mongodb atlas alternative',
    'mongodb high availability',
    'mongodb cluster setup',
    'cheap mongodb hosting',
  ],
  intro: [
    'A single MongoDB container is fine until it restarts mid-write. A replica set is the unit of production MongoDB: automatic failover, rollback safety, and the topology that change streams and transactions actually require. This template runs a 3-member replica set (rs0) on the stock mongo image - the --replSet flags ride each service’s command, no custom build.',
    'A tiny rs-init sidecar waits for the members, runs rs.initiate() exactly once (idempotent - re-runs detect the initialized set and skip), then idles at a hard 128 MiB cap. Each member keeps its data on its own 10 GB volume.',
    'Everything is internal-only by design: this template ships without auth, so the project network is the security boundary - exactly like a VPC-peered Atlas cluster, minus the bill. Apps connect with the standard multi-host connection string and get driver-level failover for free.',
  ],
  features: [
    'MongoDB 8, 3-member replica set rs0 - transactions and change streams work',
    'Stock mongo image with command passthrough; no custom image to maintain',
    'Idempotent self-initialization (rs-init sidecar, 128 MiB)',
    'Automatic primary election and driver failover on node loss',
    'Per-member 10 GB persistent volumes',
    'Internal-only: never exposed to the internet',
  ],
  topology: [
    { service: 'mongo-1..3', role: 'replica-set members (:27017)', isPublic: 'no' },
    { service: 'rs-init', role: 'one-time rs.initiate(), then idles', isPublic: 'no' },
  ],
  requiredVars: [],
  ramMiB: 3200,
  diskGB: 30,
  services: 4,
  sizingNote:
    '1 GiB per member suits small-to-medium working sets; WiredTiger sizes its cache to the container limit. Grow volumes with your data - 10 GB each is the starting point.',
  faq: [
    {
      q: 'How much cheaper is this than MongoDB Atlas?',
      a: 'Atlas M10 - its smallest dedicated tier - runs about $57/month for one 2 GB node-equivalent cluster. This 3-member replica set fits the 4 GiB Miget hobby plan at $25/month flat, with capacity left for the apps that use it.',
    },
    {
      q: 'Why a replica set instead of a single mongod?',
      a: 'Failover, durability, and features: multi-document transactions and change streams require a replica set. With three members, the set survives any single node failure with automatic primary election - your driver reconnects on its own.',
    },
    {
      q: 'How do applications connect?',
      a: 'From the same Miget project: mongodb://mongo-1:27017,mongo-2:27017,mongo-3:27017/?replicaSet=rs0. Listing all members lets the driver discover the topology and fail over automatically.',
    },
    {
      q: 'Is it safe to run MongoDB without authentication?',
      a: 'Only because nothing outside the project network can reach it: all members are private with no ingress route, the same trust model as a database inside a VPC. Never expose these services publicly; if you need cross-project access, add keyfile auth first.',
    },
    {
      q: 'Can I use this for transactions and change streams?',
      a: 'Yes - both require a replica set, which is exactly what this is. Point your ODM (Mongoose, Prisma, Spring Data) at the rs0 connection string and they work out of the box.',
    },
  ],
};
