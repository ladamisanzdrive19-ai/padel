/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        // Redirige el enlace antiguo de los vecinos al nuevo código privado
        source: '/reserva',
        destination: '/alcobendas-25-f8k2',
        permanent: true,
      },
      {
        // Limpia el rastro de la carpeta /test mandándola a la raíz
        source: '/test',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig