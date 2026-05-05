'use client';

import React, { useState } from 'react';
import { 
  Building, 
  ShieldCheck, 
  PlayCircle, 
  CheckCircle2, 
  Zap, 
  LayoutGrid, 
  QrCode, 
  Wifi,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  MessageSquare,
  ArrowRight,
  User,
  Clock,
  MapPin,
  Pointer
} from 'lucide-react';

export default function UrbaReservaLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "¿Los vecinos tienen que instalar alguna aplicación?",
      a: "No. Los vecinos acceden a través de un enlace web o escaneando un código QR. Funciona como una app nativa en su móvil, pero sin descargas ni registros."
    },
    {
      q: "¿Qué pasa con los vecinos que no se llevan bien con la tecnología?",
      a: "La interfaz es tan simple que si saben usar WhatsApp, saben reservar. Solo tienen que tocar la hora que quieren y confirmar."
    },
    {
      q: "¿Podemos poner nuestras propias normas de la urbanización?",
      a: "Por supuesto. Podéis decidir cuántos días de antelación se permite reservar, la duración máxima del turno y el horario de apertura."
    },
    {
      q: "¿Cómo se justifica este gasto a los vecinos?",
      a: "UrbaReserva pacifica la convivencia. Evita conflictos, automatiza turnos y profesionaliza la gestión de las zonas comunes."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFEFF] text-slate-900 relative overflow-hidden antialiased font-[var(--font-body),_sans-serif]">
      
      {/* Estilos para animaciones */}
      <style jsx global>{`
        .glass-card { 
          background: rgba(255, 255, 255, 0.95); 
          backdrop-filter: blur(24px); 
          border: 1px solid rgba(255, 255, 255, 1); 
        }
        @keyframes pointerClick {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-2px, 2px) scale(0.9); }
        }
        .animate-click {
          animation: pointerClick 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* Fondo Degradado Morado */}
      <div className="absolute top-0 right-0 w-[80vw] h-[800px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-200/80 via-purple-100/40 to-transparent -z-10 pointer-events-none"></div>

      {/* Navegación */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm border-b border-slate-200/50">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-xl font-extrabold text-slate-900">
            <Building className="text-indigo-600" size={24} />
            <span>UrbaReserva</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-tight text-slate-600">
            <a className="hover:text-indigo-600 transition-colors" href="#demo">Cómo funciona</a>
            <a className="hover:text-indigo-600 transition-colors" href="#caracteristicas">Características</a>
            <a className="hover:text-indigo-600 transition-colors" href="#faq">FAQ</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-md">
              Acceso Demo
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32">
        {/* Hero Section (Escritorio) */}
        <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-start mb-24 min-h-[60vh]">
          <div className="space-y-8 relative z-10 pt-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-widest border border-indigo-100">
              <ShieldCheck size={16} />
              <span>La paz vecinal empieza aquí</span>
            </div>
            <h1 className="font-extrabold text-5xl md:text-7xl text-slate-900 leading-[1.05] tracking-tight">
              Digitaliza tu comunidad y reserva en <span className="text-indigo-600 italic">20 segundos</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg font-medium">
              Elimina el caos de los listados en papel y los grupos de WhatsApp. Una plataforma inteligente para gestionar tu urbanización sin fricción.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 hover:scale-[1.02] transition-transform">
                Solicitar Demostración
              </button>
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                <PlayCircle size={20} />
                Ver funcionamiento
              </button>
            </div>
          </div>

          {/* Tarjetas Hero (Ocultas en móvil para evitar desorden) */}
          <div className="hidden lg:flex relative justify-center items-center">
            <div className="relative w-full max-w-md">
              {/* Calendario Grande */}
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
                    <span className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-200 text-sm font-extrabold">17</span>
                    <Pointer className="absolute -bottom-2 -right-2 text-emerald-500 animate-click z-20" size={24} fill="currentColor" />
                  </div>
                  {[18,19,20,21,22,23,24,25,26,27,28,29,30].map(d => <div key={d} className="text-slate-800">{d}</div>)}
                </div>
              </div>

              {/* Tarjeta Pablo Flotante */}
              <div className="absolute -bottom-10 -left-20 glass-card p-6 rounded-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] z-20 flex flex-col gap-4 min-w-[300px] border border-white">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center border-2 border-white shadow-sm">
                    <User size={24} className="text-indigo-600" />
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
                  <div className="bg-indigo-600 text-white p-2.5 rounded-xl">
                    <LayoutGrid size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Pádel 1</span>
                    <div className="flex items-center gap-1 text-indigo-600 font-bold">
                      <Clock size={14} />
                      19:00 - 21:00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Demostración Pasos (Móvil y Escritorio) */}
        <section id="demo" className="max-w-4xl mx-auto mb-32 px-6 space-y-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Reserva en 3 sencillos pasos</h2>
            <p className="text-slate-500 font-medium">Diseñado para ser utilizado por cualquier vecino, sin importar su edad.</p>
          </div>

          {/* Paso 1: Calendario */}
          <div className="flex flex-col items-center">
            <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Paso 1: Elige el día</span>
            <div className="glass-card w-full max-w-[380px] p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
              <h3 className="text-xl font-extrabold text-slate-800 mb-8">Abril 2026</h3>
              <div className="grid grid-cols-7 text-center text-[10px] font-black text-slate-300 mb-6 uppercase">
                <div>L</div><div>M</div><div>X</div><div>J</div><div>V</div><div>S</div><div>D</div>
              </div>
              <div className="grid grid-cols-7 gap-y-5 text-center text-sm font-bold text-slate-400">
                <div className="text-slate-200">30</div><div className="text-slate-200">31</div>
                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(d => <div key={d} className="text-slate-300">{d}</div>)}
                <div className="flex justify-center"><span className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg font-black text-xs">17</span></div>
                {[18,19,20,21,22,23,24,25,26].map(d => <div key={d} className="text-slate-800">{d}</div>)}
              </div>
            </div>
          </div>

          {/* Paso 2: Horario (Estilo image_12.png) */}
          <div className="flex flex-col items-center">
            <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Paso 2: Horario y Duración</span>
            <div className="glass-card w-full max-w-[380px] p-10 rounded-[2.5rem] shadow-xl border border-slate-100 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Horario</p>
              <div className="space-y-2 mb-10">
                <p className="text-2xl font-bold text-slate-200">16:00</p>
                <div className="bg-indigo-50 py-3 rounded-2xl border border-indigo-100 inline-block px-10">
                   <p className="text-4xl font-black text-indigo-400 tracking-tight">16:30</p>
                </div>
                <p className="text-2xl font-bold text-slate-200">17:00</p>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-10">
                {['30\'', '60\'', '90\'', '120\''].map(t => (
                  <div key={t} className={`py-3 rounded-2xl border text-xs font-black ${t === '90\'' ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white border-slate-100 text-slate-400'}`}>
                    {t}
                  </div>
                ))}
              </div>
              <div className="bg-indigo-50/50 py-4 rounded-2xl text-indigo-600 text-xs font-bold border border-indigo-100/50">
                ✓ 17 abr · 16:30 → 18:00 (90')
              </div>
            </div>
          </div>

          {/* Paso 3: Confirmación (Estilo image_14.png) */}
          <div className="flex flex-col items-center">
            <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Paso 3: Identificación</span>
            <div className="glass-card w-full max-w-[380px] p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-4">
                <p className="text-sm font-black text-slate-700 uppercase tracking-widest">PABLO</p>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-white border border-slate-100 rounded-2xl p-4 text-center font-black text-slate-800 text-sm shadow-sm flex justify-center items-center gap-1">1 <ChevronDown size={14} className="text-indigo-400" /></div>
                <div className="bg-white border border-slate-100 rounded-2xl p-4 text-center font-black text-slate-800 text-sm shadow-sm flex justify-center items-center gap-1">2 <ChevronDown size={14} className="text-indigo-400" /></div>
                <div className="bg-white border border-slate-100 rounded-2xl p-4 text-center font-black text-slate-800 text-sm shadow-sm flex justify-center items-center gap-1">A <ChevronDown size={14} className="text-indigo-400" /></div>
              </div>
              <button className="w-full bg-indigo-600 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-200 flex items-center justify-center gap-3 active:scale-95 transition-transform">
                Confirmar <CheckCircle2 size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="bg-slate-50 border-t border-slate-200 py-32">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-slate-900 text-center mb-12">Preguntas Frecuentes</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className={`bg-white border ${openFaq === index ? 'border-indigo-500' : 'border-slate-200 hover:border-slate-300'} rounded-2xl overflow-hidden transition-all duration-300 shadow-sm`}>
                  <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex justify-between items-center p-6 text-left">
                    <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                    <ChevronDown className={`text-slate-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-indigo-600' : ''}`} size={20} />
                  </button>
                  <div className={`px-6 text-slate-600 font-medium overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section className="max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="font-extrabold text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight">Empieza a digitalizar tu comunidad hoy</h2>
            <p className="text-slate-600 text-lg font-medium max-w-lg">Configuramos una demo gratuita con los datos reales de tu urbanización en menos de 24 horas.</p>
            <div className="flex flex-col gap-4 text-slate-700 font-bold">
              <div className="flex items-center gap-3"><Mail className="text-indigo-600" size={20} /><span>contacto@urbareserva.com</span></div>
              <div className="flex items-center gap-3"><MessageSquare className="text-emerald-500" size={20} /><span>Soporte WhatsApp</span></div>
            </div>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
            <h3 className="font-bold text-2xl text-slate-950 mb-8">Solicita una Demo</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" className="w-full bg-slate-50 border border-slate-100 text-slate-900 px-6 py-4 rounded-xl focus:border-indigo-300 focus:outline-none" placeholder="Nombre de la Urbanización" />
              <input type="email" className="w-full bg-slate-50 border border-slate-100 text-slate-900 px-6 py-4 rounded-xl focus:border-indigo-300 focus:outline-none" placeholder="Email de contacto" />
              <button className="w-full bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-500 transition-all flex items-center justify-center gap-2">Solicitar Demostración <ArrowRight size={20} /></button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-lg font-bold text-slate-900 flex items-center gap-2"><Building className="text-indigo-600" size={20} />UrbaReserva</div>
          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">© 2026 UrbaReserva. Cumplimiento RGPD.</div>
        </div>
      </footer>
    </div>
  );
}