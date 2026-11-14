# Local data contract

The demo seed is the executable reference for the legacy read-only adapter. Four separate SQLite files live under `data/demo/`: catalog, image index, pilot and flagship. These are generated locally and excluded from Git. Box metadata uses a `boxes.json` object with `bySlug`; image links resolve beneath the configured image root.

`series → card_sets → cards → card_subjects` represents directory identity. `variants` and `parallels` are separate records. `local_card_images` links a card ID, set ID, series slug and side to a relative file path, SHA-256 and source metadata. Files must stay within the configured image root; matching only a player name or number is insufficient.

The adapter supports a separately identified pilot snapshot and a separately identified flagship snapshot. To use them, configure the corresponding paths and `ATLAS_PILOT_SERIES_ID`; no real catalog IDs or machine-specific drive defaults are shipped. See `seed-demo.cjs` for expected legacy tables. This is compatibility with a legacy schema, not a general CSV importer.

Optional local reference JSONs (`today-download-images-v1.json`, `gap-fill-images-v1.json`, `image-review-decisions-v1.json`, `official-previews-v1.json`) are not supplied as private datasets. They preserve explicit candidate/source decisions without replacing original files. Keep them private if they contain machine paths or unpublished data.

Statistics must distinguish main card slots, variant rows, available image references and personal ownership. Front/back are two images of one card, not two card variants. No image implies ownership. The browser collection in this release records a main slot and quantity; full physical-item/serial tracking remains future work.
