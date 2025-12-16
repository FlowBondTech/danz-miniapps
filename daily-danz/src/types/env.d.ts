declare namespace NodeJS {
  interface ProcessEnv {
    // GraphQL API endpoint
    NEXT_PUBLIC_API_URL: string
    // Miniapp URL for manifest
    NEXT_PUBLIC_MINIAPP_URL: string
    // OnchainKit API key
    NEXT_PUBLIC_ONCHAINKIT_API_KEY: string
    // WalletConnect Project ID
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: string
    // Chain ID (Base = 8453, Base Sepolia = 84532)
    NEXT_PUBLIC_CHAIN_ID: string
  }
}
