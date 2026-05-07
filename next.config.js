/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/reserva',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig