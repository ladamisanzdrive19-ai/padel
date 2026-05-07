'use client';
import Link from 'next/link';
import { ChevronLeft, Building } from 'lucide-react';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FDFEFF] text-slate-900 font-[var(--font-body),_sans-serif] antialiased relative overflow-hidden">
      
      {/* Estilos para animaciones de fondo */}
      <style jsx global>{`
        @keyframes blobFloat {
          0%, 100% { transform: scale(1) translate(0px, 0px); opacity: 0.7; }
          33% { transform: scale(1.07) translate(20px, -15px); opacity: 1; }
          66% { transform: scale(0.95) translate(-15px, 10px); opacity: 0.5; }
        }
        .blob-1 { animation: blobFloat 8s ease-in-out infinite; }
        .blob-2 { animation: blobFloat 11s ease-in-out infinite reverse; animation-delay: -3s; }
        .blob-3 { animation: blobFloat 14s ease-in-out infinite; animation-delay: -6s; }
      `}</style>

      {/* Fondo Degradado Morado */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="blob-1 absolute top-[-15%] left-[-10%] w-[70%] h-[70%] bg-purple-300/30 rounded-full blur-[140px]" />
        <div className="blob-2 absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-violet-200/40 rounded-full blur-[120px]" />
        <div className="blob-3 absolute top-[35%] right-[0%] w-[45%] h-[45%] bg-indigo-200/25 rounded-full blur-[100px]" />
      </div>

      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm border-b border-slate-200/50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-purple-600 font-bold hover:text-purple-700 transition-colors">
            <ChevronLeft size={20} />
            <span>Volver a la Home</span>
          </Link>
          <div className="flex items-center gap-2 font-black text-slate-400 text-sm tracking-tighter">
            <Building className="text-purple-600" size={16} />
            <span>URBARESERVA</span>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-xl p-8 sm:p-12 rounded-[2.5rem] shadow-xl border border-slate-100">
          <article className="prose prose-slate prose-headings:text-slate-900 prose-headings:font-extrabold prose-p:text-slate-600 prose-p:font-medium prose-strong:text-slate-900 prose-a:text-purple-600 max-w-none">
            {children}
          </article>
        </div>
      </main>

      <footer className="w-full border-t border-slate-200 bg-white py-12 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
          © 2026 UrbaReserva · Documentación Legal
        </div>
      </footer>
    </div>
  );
}