import { Building, ShieldCheck, PlayCircle, CheckCircle2, LayoutGrid, ChevronLeft, ChevronRight, Mail, MessageSquare, ArrowRight, User, Clock, MapPin, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import punteroImg from '../puntero.png'; 
import InteractiveDemo from './components/InteractiveDemo';
import FaqSection from './components/FaqSection';

export default function UrbaReservaLandingPage() {
  return (
    <div className="min-h-screen bg-[#FDFEFF] text-slate-900 relative overflow-hidden antialiased font-[var(--font-body),_sans-serif]">
      
      {/* Fondo Degradado Morado */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="blob-1 absolute top-[-15%] left-[-10%] w-[70%] h-[70%] bg-purple-300/30 rounded-full blur-[140px]" />
        <div className="blob-2 absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-violet-200/40 rounded-full blur-[120px]" />
        <div className="blob-3 absolute top-[35%] right-[0%] w-[45%] h-[45%] bg-indigo-200/25 rounded-full blur-[100px]" />
      </div>

      {/* Navegación */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm border-b border-slate-200/50">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-xl font-extrabold text-slate-900">
            <Building className="text-purple-600" size={24} />
            <span>UrbaReserva</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-tight text-slate-600">
            <a className="hover:text-purple-600 transition-colors" href="#demo">Cómo funciona</a>
            <a className="hover:text-purple-600 transition-colors" href="#caracteristicas">Características</a>
            <a className="hover:text-purple-600 transition-colors" href="#faq">FAQ</a>
            <a className="hover:text-purple-600 transition-colors" href="#contacto">Contacto</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#demo" className="bg-purple-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-purple-700 transition-all active:scale-95 shadow-md flex items-center justify-center">
              Probar Ahora
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-24 lg:pt-32 relative z-10">
        <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-start mb-24 min-h-[60vh]">
          <div className="space-y-6 lg:space-y-8 relative z-10 pt-2 lg:pt-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-700 text-xs font-black uppercase tracking-widest border border-purple-100">
              <ShieldCheck size={16} />
              <span>La paz vecinal empieza aquí</span>
            </div>
            <h1 className="font-extrabold text-5xl md:text-7xl text-slate-900 leading-[1.05] tracking-tight">
              Digitaliza tu comunidad y reserva en <span className="text-purple-600 italic">20 segundos</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg font-medium">
              Elimina el caos de los listados en papel y los grupos de WhatsApp. Una plataforma inteligente para gestionar tu urbanización sin fricción.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#demo" className="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-purple-200 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                <PlayCircle size={20} />
                Ver funcionamiento
              </a>
              <a href="#contacto" className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center shadow-sm">
                Solicitar Demostración
              </a>
            </div>
          </div>

          <div className="hidden lg:flex relative justify-center items-center">
            <div className="relative w-full max-w-md">
              <div className="glass-card p-10 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] relative z-10 border border-white">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-extrabold text-slate-800">Abril 2026</h3>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 bg-white shadow-sm"><ChevronLeft size={20} /></div>
                    <div className="w-10 h-10 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 bg-white shadow-sm"><ChevronRight size={20} /></div>
                  </div>
                </div>
                <div className="grid grid-cols-7 text-center text-xs font-black text-slate-300 mb-8 uppercase tracking-widest">
                  <div>L</div><div>M</div><div>X</div><div>J</div><div>V</div><div>S</div><div>D</div>
                </div>
                <div className="grid grid-cols-7 gap-y-6 text-center text-sm font-bold text-slate-400 relative">
                  <div className="text-slate-200">30</div><div className="text-slate-200">31</div>
                  {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(d => <div key={d} className="text-slate-300">{d}</div>)}
                  <div className="relative flex justify-center items-center">
                    <span className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-purple-200 text-sm font-extrabold">17</span>
                    <Image 
                      src={punteroImg} 
                      alt="Puntero" 
                      className="absolute -bottom-2 -right-2 w-8 h-8 animate-click z-20 drop-shadow-md" 
                    />
                  </div>
                  {[18,19,20,21,22,23,24,25,26,27,28,29,30].map(d => <div key={d} className="text-slate-800">{d}</div>)}
                </div>
              </div>

              <div className="absolute -bottom-10 -left-20 glass-card p-6 rounded-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] z-20 flex flex-col gap-4 min-w-[300px] border border-white">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center border-2 border-white shadow-sm">
                    <User size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-base font-extrabold text-slate-900 leading-tight">Pablo</p>
                    <div className="flex items-center gap-1 text-slate-500">
                      <MapPin size={14} />
                      <p className="text-xs font-bold">Portal 1, 2ºA</p>
                    </div>
                  </div>
                  <div className="ml-auto bg-emerald-100 text-emerald-600 p-2 rounded-full">
                    <CheckCircle2 size={18} />
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="bg-purple-600 text-white p-2.5 rounded-xl">
                    <LayoutGrid size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Pádel 1</span>
                    <div className="flex items-center gap-1 text-purple-600 font-bold">
                      <Clock size={14} />
                      19:00 - 21:00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="demo" className="max-w-7xl mx-auto mb-32 px-6 scroll-mt-24 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Pruébalo tú mismo. Reserva en 3 sencillos pasos
            </h2>
            <p className="text-slate-500 font-bold text-lg">
              Diseñado para ser utilizado por cualquier vecino, sin importar su edad.
            </p>
          </div>
          <InteractiveDemo />
        </section>

        <section id="caracteristicas" className="max-w-7xl mx-auto mb-40 px-6 scroll-mt-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-8 rounded-[2.5rem] border border-slate-100 hover:border-purple-200 transition-all group">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                <Zap size={28} fill="currentColor" fillOpacity={0.2} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Sin descargas</h3>
              <p className="text-slate-500 font-medium leading-relaxed text-sm">
                Olvídate de App Store o Play Store. Los vecinos entran escaneando un <span className="text-purple-600 font-bold">código QR</span> o mediante un enlace directo. Cero fricción.
              </p>
            </div>
            <div className="glass-card p-8 rounded-[2.5rem] border border-slate-100 hover:border-purple-200 transition-all group">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                <LayoutGrid size={28} fill="currentColor" fillOpacity={0.2} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Reglas a medida</h3>
              <p className="text-slate-500 font-medium leading-relaxed text-sm">
                Cada urbanización es un mundo. Tú decides: horarios de apertura, duración de los turnos y <span className="text-purple-600 font-bold">máximo de reservas</span> por persona.
              </p>
            </div>
            <div className="glass-card p-8 rounded-[2.5rem] border border-slate-100 hover:border-purple-200 transition-all group">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                <Clock size={28} fill="currentColor" fillOpacity={0.2} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Histórico total</h3>
              <p className="text-slate-500 font-medium leading-relaxed text-sm">
                Se acabó el "yo no he sido". El administrador tiene acceso a un registro de quién ha reservado cada día. <span className="text-purple-600 font-bold">Transparencia absoluta</span> para la comunidad.
              </p>
            </div>
            <div className="glass-card p-8 rounded-[2.5rem] border border-slate-100 hover:border-purple-200 transition-all group">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                <Building size={28} fill="currentColor" fillOpacity={0.2} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Todo en uno</h3>
              <p className="text-slate-500 font-medium leading-relaxed text-sm">
                Pádel, tenis, gimnasio o incluso la barbacoa comunitaria. Gestiona <span className="text-purple-600 font-bold">todas las instalaciones</span> desde un único panel centralizado.
              </p>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white/60 backdrop-blur-md border-t border-slate-200 py-32">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-slate-900 text-center mb-12">Preguntas Frecuentes</h2>
            <FaqSection />
          </div>
        </section>

        <section id="contacto" className="max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center scroll-mt-24">
          <div className="space-y-8">
            <h2 className="font-extrabold text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight">Empieza a digitalizar tu comunidad hoy</h2>
            <p className="text-slate-600 text-lg font-medium max-w-lg">Configuramos una demo gratuita con los datos reales de tu urbanización en menos de 24 horas.</p>
            <div className="flex flex-col gap-4 text-slate-700 font-bold">
              <div className="flex items-center gap-3"><Mail className="text-purple-600" size={20} /><span>contacto@urbareserva.com</span></div>
              <div className="flex items-center gap-3"><MessageSquare className="text-emerald-500" size={20} /><span>Soporte WhatsApp</span></div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
            <h3 className="font-bold text-2xl text-slate-950 mb-8">Solicita una Demo</h3>
            <form className="space-y-4">
              <input type="text" className="w-full bg-slate-50 border border-slate-100 text-slate-900 px-6 py-4 rounded-xl focus:border-purple-300 focus:outline-none" placeholder="Nombre de la Urbanización" />
              <input type="email" className="w-full bg-slate-50 border border-slate-100 text-slate-900 px-6 py-4 rounded-xl focus:border-purple-300 focus:outline-none" placeholder="Email de contacto" />
              <button type="button" className="w-full bg-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-500 transition-all flex items-center justify-center gap-2">Solicitar Demostración <ArrowRight size={20} /></button>
            </form>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-slate-200 bg-white py-16 mt-32 relative z-10">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2.5 text-xl font-black text-slate-900 tracking-tighter">
              <div className="bg-purple-600 p-1.5 rounded-lg text-white shadow-sm">
                <Building size={20} />
              </div>
              <span>UrbaReserva</span>
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.15em] ml-1">
              © 2026 · Gestión inteligente de comunidades
            </p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-10 gap-y-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <Link href="/legal/aviso-legal" className="hover:text-purple-600 transition-colors relative group">
              Aviso Legal<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/legal/privacidad" className="hover:text-purple-600 transition-colors relative group">
              Privacidad<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/legal/cookies" className="hover:text-purple-600 transition-colors relative group">
              Cookies<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/legal/condiciones" className="hover:text-purple-600 transition-colors relative group">
              Condiciones<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}