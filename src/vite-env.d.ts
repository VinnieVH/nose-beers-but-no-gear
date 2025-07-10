/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WARCRAFTLOGS_CLIENT_ID: string
  readonly VITE_WARCRAFTLOGS_CLIENT_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
