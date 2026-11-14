# Security

Do not post credentials, session cookies, uploaded private images or personal information in public issues. For a suspected vulnerability use this repository's private vulnerability reporting option when available; otherwise contact the maintainer through GitHub without including secrets in the first message.

This is a local-first reference application, not an independently security-audited hosted service. Public deployment requires HTTPS, correct origin configuration, durable storage, database/storage authorization policies, abuse controls, operational backup/restore, account recovery and a review of all exposed content. The prototype's rate limits and 50-account cap are not proof of one human per account.

No shared/default administrator password is shipped. Keep generated owner credentials and all `data/` files private. Never publish server-only secrets in browser environment variables.
