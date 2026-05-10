import Link from 'next/link';
import { Building, ArrowLeft, MapPinOff } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDFEFF] text-slate-900 relative overflow-hidden antialiased font-sans flex items-center justify-center p-6">
      
      {/* Fondo Degradado Morado (Heredado de globals.css) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="blob-1 absolute top-[-15%] left-[-10%] w-[70%] h-[70%] bg-purple-300/30 rounded-full blur-[140px]" />
        <div className="blob-2 absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-violet-200/40 rounded-full blur-[120px]" />
        <div className="blob-3 absolute top-[35%] right-[0%] w-[45%] h-[45%] bg-indigo-200/25 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg text-center">
        {/* Tarjeta Glassmorphism */}
        <div className="glass-card p-10 sm:p-14 rounded-[3rem] shadow-2xl border border-white flex flex-col items-center">
          
          <div className="w-24 h-24 bg-purple-50 rounded-[2rem] flex items-center justify-center text-purple-600 mb-8 shadow-inner border border-purple-100 rotate-12 hover:rotate-0 transition-transform duration-500">
            <MapPinOff size={40} />
          </div>

          <h1 className="text-7xl sm:text-8xl font-extrabold text-slate-900 tracking-tighter mb-4">
            404
          </h1>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 tracking-tight">
            Pista no encontrada
          </h2>

          <p className="text-slate-500 font-medium leading-relaxed mb-10 text-sm sm:text-base">
            Parece que te has perdido por la urbanización. La página que buscas no existe, ha sido movida o está fuera de servicio.
          </p>

          <Link 
            href="https://urbareserva.com" 
            className="w-full bg-purple-600 text-white py-5 rounded-3xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-purple-200 hover:bg-purple-700 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <ArrowLeft size={18} />
            Volver a la Home
          </Link>
        </div>

        {/* Logo inferior */}
        <div className="mt-12 flex items-center justify-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-xs">
          <Building size={16} />
          <span>UrbaReserva</span>
        </div>
      </div>
    </div>
  );
}