# Local and cloud deployment

Local mode remains one Node.js process with read-only catalog and writable community SQLite. Do not deploy writable SQLite to Vercel.

Cloud mode uses Next.js, bundled synthetic catalogs, and a dedicated Supabase project for members, sessions, reports, corrections, audit records and private uploaded images. This is application-managed username/password authentication, not Supabase Auth. Passwords use scrypt; tokens are hashed in storage. Email verification and recovery are not implemented.

## Provisioning

1. Apply the SQL migration under supabase/migrations to a dedicated project. RLS is enabled; browser roles have no grants; RPC execution is service-only. The upload bucket is private.
2. Generate a strong random gateway token. Replace __ATLAS_GATEWAY_TOKEN_SHA256__ in the Edge Function only in a private deployment payload. Deploy atlas-community with JWT verification disabled because the function authenticates the gateway token itself. Its managed service-role key stays inside Supabase; never commit live tokens.
3. Set server-only Vercel production variables ATLAS_CLOUD_GATEWAY (function URL), ATLAS_CLOUD_KEY (sensitive token), ATLAS_PUBLIC_ORIGIN (exact HTTPS origin). No browser credential. Configure preview separately.
4. Build: npm run setup && npm run build, Node 26. Only fictional DEMO artwork is generated. Next output tracing bundles data/demo.
5. Provision a private random-password administrator through the database operator. Admins do not consume member seats; never automatically promote a public registration.

## Operational limits

- Cloud request total: 4 MB, below Vercel payload limit. Single-frame JPEG/PNG/WebP only, decoded and re-encoded to WebP without metadata. Pending files remain private.
- Five pending reports per member; 20 submission attempts daily. Transactions serialize the global 50-member cap and approval/revert transitions.
- Approved corrections apply before searching/filtering. Front/back images share one card identity. Cloud media is uncached to honor reverts.
- Collections remain browser localStorage. Main-card counts exclude parallel versions. Resumable filtered bulk image export is not implemented.
- Community failures surface as errors instead of returning stale corrections. A build is not cloud acceptance.

## Verify and roll back

Run typecheck, build, local smoke and public-source scans. Independently test the public URL, cloud login, upload privacy, moderation, revert, supporters and corrected search.

Retain migration and deployment commit IDs. Roll back to a compatible cloud-enabled deployment; never use writable SQLite on Vercel. Do not drop tables or overwrite private objects during rollback. Back up database and objects privately and practice restore to a separate project.
