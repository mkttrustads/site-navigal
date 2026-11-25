/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
  },
  async redirects() {
    return [
      // A página de setores foi incorporada ao catálogo (seletor de setor em /products).
      { source: '/industries', destination: '/products', permanent: true },
    ]
  },
}

module.exports = nextConfig
