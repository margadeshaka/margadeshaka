# Deployment

The site deploys to **Firebase Hosting** only. Vercel and Azure Static Web Apps
were both removed — if you found this file expecting either, that path is gone.

## How it happens

Pushing to a branch deploys it. `.github/workflows/deploy.yml` does the work.

| Branch | Environment | Site | URL |
|--------|-------------|------|-----|
| `main` | production | `margadeshaka-af4de` | margadeshaka-af4de.web.app → margadeshaka.com once DNS moves |
| `Develop` | staging | `margadeshaka-staging` | margadeshaka-staging.web.app |

Staging sends `X-Robots-Tag: noindex, nofollow`. It serves the same content on a
different origin, so without that header Google can index it and treat it as
duplicate content competing with the real site. Don't remove it —
`npm run verify:hosting` fails the build if you do.

The workflow can also be run manually from the Actions tab with an environment
choice, which is the way to redeploy without pushing a commit.

## Environment variables

Baked in at **build** time, because the site is a static export — setting them
on the host afterwards does nothing.

| Variable | production | staging |
|----------|-----------|---------|
| `NEXT_PUBLIC_BASE_URL` | `https://margadeshaka.com` | `https://margadeshaka-staging.web.app` |
| `NEXT_PUBLIC_GA_ID` | from repo secret | unset, so analytics never mounts |

`NEXT_PUBLIC_BASE_URL` drives canonicals, the sitemap and JSON-LD, which is why
staging must not advertise the production domain.

## Authentication

CI authenticates with the `FIREBASE_SERVICE_ACCOUNT` repo secret — a dedicated
`github-actions-deploy@margadeshaka-af4de.iam.gserviceaccount.com` service
account holding only `roles/firebasehosting.admin` and `roles/firebase.viewer`.
Rotate it by creating a new key and updating the secret; nothing else changes.

## Deploying by hand

```bash
npm i -g firebase-tools
firebase login

npm run deploy          # production
npm run deploy:staging  # staging
npm run deploy:preview  # throwaway preview URL on the staging site, 7-day expiry
```

## Why firebase.json is duplicated

Firebase cannot share one hosting block across two sites, so `firebase.json`
carries the same config twice, once per target. That duplication is the risk —
someone tunes a cache header on production and forgets staging, and staging
quietly stops representing what production will do.
`scripts/verify-hosting-config.mjs` (`npm run verify:hosting`, run in CI) fails
if the two targets diverge, if staging loses its noindex header, or if
`trailingSlash` stops mirroring `next.config.js`.

## Custom domain

`margadeshaka.com` does not point here yet — it still resolves to a
decommissioned load balancer. To move it: add the domain in the Firebase console
under Hosting for the production site, then replace the apex A records with the
ones Firebase provides. The certificate is issued automatically.

Note Firebase serves `Strict-Transport-Security: max-age=31556926;
includeSubDomains; preload`. Once the apex is attached, that HSTS policy applies
to **every** subdomain, so make sure nothing under `margadeshaka.com` is still
served over plain HTTP first.
