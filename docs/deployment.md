# Deployment boundary

The runnable release is one Node.js process with writable local member/upload storage and read-only catalog data. Use `npm run setup`, build, then `npm start`. The local demo binds loopback on port 3240.

For a persistent self-hosted server, use an HTTPS reverse proxy, configure the exact `ATLAS_PUBLIC_ORIGIN`, privately persist member storage, apply upload/rate/time limits and test backups. Do not expose real candidate images without a separate publication decision. Pending uploads must remain private. `node scripts/backup-community.cjs` creates a consistent SQLite backup; also retain uploads and practice restore with the service stopped.

## Planned GitHub + Supabase + Vercel architecture

- GitHub: source, review, CI and versioned migrations. No image library or member DB.
- Supabase: durable Postgres, Auth, private uploads and approved image assets. Required tables use RLS and explicit grants; service keys remain server-only.
- Vercel: Next.js site after replacing local filesystem/SQLite/auth adapters. A successful build does not prove these adapters exist.
- Data analysis: provenance, missing images, mismatches, moderation and statistics with explicit card/variant/image/owned-item grain.

The cloud adapters, cloud migration, hosted account recovery and resumable filtered bulk export are **not implemented in this release**. Do not create multiple independent copies of the member SQLite and assume the 50-account limit remains global. Do not deploy an unmodified writable SQLite member service to an ephemeral function filesystem.

## Backup and rollback

Catalog and image inputs remain separate from code. Backup the writable community DB with the supplied SQLite backup command and retain its matching uploads. Roll back code to a tested commit without deleting data. Test schema compatibility before starting old code against newer data. The seed script refuses to overwrite an existing demo catalog.
