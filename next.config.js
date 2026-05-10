/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        // 1. VECINOS: Si entran por el enlace viejo (vercel.app),
        // los mandamos directos al software con el dominio nuevo arriba.
        source: '/',
        has: [
          {
            type: 'host',
            value: 'padel-bice.vercel.app',
          },
        ],
        destination: 'https://urbareserva.com/alcobendas-25-f8k2',
        permanent: true,
      },
      {
        // 2. VECINOS: Por si tenían guardado el enlace que terminaba en /reserva
        source: '/reserva',
        destination: '/alcobendas-25-f8k2',
        permanent: true,
      },
      {
        // 3. LIMPIEZA: Mandar cualquier rastro de /test a la nueva home
        source: '/test',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig