# DANZ Miniapps

Farcaster miniapps for the DANZ dance-to-earn platform.

## Structure

```
danz-miniapps/
├── daily-danz/     # Daily check-in miniapp (port 3002)
├── danz-main/      # Main DANZ miniapp (port 3001)
└── shared/         # Shared utilities and types
```

## Development

```bash
# Install all dependencies
npm install --legacy-peer-deps

# Run Daily DANZ
npm run dev:daily-danz

# Run DANZ Main
npm run dev:danz-main

# Build for production
npm run build:daily-danz
npm run build:danz-main
```

## Deployment

Each miniapp deploys as a separate Netlify site:

| App | Netlify Site | Base Directory |
|-----|--------------|----------------|
| Daily DANZ | daily-danz.netlify.app | `daily-danz` |
| DANZ Main | danz-main.netlify.app | `danz-main` |

## Environment Variables

Set in Netlify Dashboard for each site:

```
NEXT_PUBLIC_API_URL=https://api.danz.xyz/graphql
NEXT_PUBLIC_MINIAPP_URL=https://your-site.netlify.app
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_key
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_id
NEXT_PUBLIC_CHAIN_ID=8453
```
