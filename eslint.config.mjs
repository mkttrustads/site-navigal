import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

// Next 16 removeu o `next lint`: o lint roda direto pelo ESLint (`npm run lint`).
// Mesmas regras de antes (next/core-web-vitals), agora em flat config.
export default defineConfig([
  ...nextVitals,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'node_modules/**']),
])
