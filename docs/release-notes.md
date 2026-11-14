# v0.1.0 — 2026-11-14

Independent open-source extraction of a local-first card-wall prototype. The original private application and data are not part of this repository or modified by this release.

- MIT code and original synthetic demo generator; 4 fictional series, 183 main slots.
- Dense wall, natural sorting, filters, front/back and zoom, browser collection.
- Isolated local member storage, 50-member cap, owner-reviewed reports/uploads, rollback and opt-in supporter list.
- Environment-configurable legacy catalog paths, no private drive defaults.
- Source-only Git checks and pinned-action GitHub CI.
- Next.js 16.4.6 and sharp 0.35.5; production dependency audit reported zero known advisories at validation time. This is not an independent security audit.

Local validation: clean dependency installation, seed creation, TypeScript, production build, isolated end-to-end API tests, rendered desktop/mobile smoke checks and source-only publication scan. The original private source files were independently hash-compared and unchanged.

No third-party card artwork, official checklist PDFs, real card datasets, member databases, passwords, session state, local verification handoffs or cloud credentials are published. Cloud Supabase/Vercel runtime adapters and filtered bulk-image export remain unimplemented; see deployment.md.
