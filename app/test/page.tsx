'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  eachDayOfInterval, 
  addMinutes, 
  parse, 
  isBefore, 
  startOfDay 
} from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  Building, 
  ShieldCheck, 
  PlayCircle, 
  CheckCircle2, 
  LayoutGrid, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  MessageSquare,
  ArrowRight,
  User,
  Clock,
  MapPin,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import punteroImg from '../puntero.png'; // Asegúrate de que la ruta a la imagen es correcta

export default function UrbaReservaLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Estados para la interactividad de la demo
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('16:30');
  const [duration, setDuration] = useState(90);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Estados de identificación (ahora inician vacíos para mostrar el placeholder)
  const [nombre, setNombre] = useState('');
  const [portal, setPortal] = useState('');
  const [piso, setPiso] = useState('');
  const [letra, setLetra] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Lógica de Calendario
  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  // Lógica de Horario
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let h = 8; h <= 22; h++) {
      slots.push(`${h.toString().padStart(2, '0')}:00`, `${h.toString().padStart(2, '0')}:30`);
    }
    return slots;
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollTop / 48);
      if (timeSlots[index]) setSelectedTime(timeSlots[index]);
    }
  };

  // Clic fuera para cerrar dropdowns
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    if (openDropdown) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openDropdown]);

  // Componente Select personalizado
  const CustomSelect = ({
    id, value, onChange, placeholder, options, disabled = false,
  }: {
    id: string; value: string; onChange: (v: string) => void;
    placeholder: string; options: string[]; disabled?: boolean;
  }) => {
    const isOpen = openDropdown === id;
    return (
      <div className="relative w-full" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpenDropdown(isOpen ? null : id)}
          className={`w-full p-4 bg-white rounded-2xl text-center font-black text-xs border transition-all flex items-center justify-center gap-1 shadow-sm
            ${disabled ? 'opacity-30 cursor-not-allowed border-slate-100' : 'cursor-pointer hover:border-purple-200 border-slate-100'}
            ${value ? 'text-slate-800' : 'text-slate-400'}
            ${isOpen ? 'border-purple-300 bg-purple-50/50' : ''}`}
        >
          {value || placeholder}
          <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-purple-600' : 'text-purple-400'}`} />
        </button>
        {isOpen && (
          <div className="absolute z-[200] top-full mt-2 left-0 right-0 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-xl overflow-hidden">
            {options.map((opt) => (
              <button key={opt} type="button"
                onClick={() => { onChange(opt); setOpenDropdown(null); }}
                className={`w-full py-3 text-xs font-black text-center transition-all hover:bg-purple-50 hover:text-purple-600
                  ${value === opt ? 'bg-purple-600 text-white hover:bg-purple-600 hover:text-white' : 'text-slate-600'}`}>
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const isFormComplete = nombre && portal && piso && letra;

  return (
    <div className="min-h-screen bg-[#FDFEFF] text-slate-900 relative overflow-hidden antialiased font-[var(--font-body),_sans-serif]">
      
      {/* Estilos para animaciones */}
      <style jsx global>{`
        .glass-card { 
          background: rgba(255, 255, 255, 0.95); 
          backdrop-filter: blur(24px); 
          border: 1px solid rgba(255, 255, 255, 1); 
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        @keyframes pointerClick {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-2px, 2px) scale(0.9); }
        }
        .animate-click {
          animation: pointerClick 1.5s ease-in-out infinite;
        }
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
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-purple-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-purple-700 transition-all active:scale-95 shadow-md">
              Probar Ahora
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-start mb-24 min-h-[60vh]">
          <div className="space-y-8 relative z-10 pt-10">
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
              <button className="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-purple-200 hover:scale-[1.02] transition-transform">
                Solicitar Demostración
              </button>
              <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                <PlayCircle size={20} />
                Ver funcionamiento
              </button>
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
                    <img 
                      src={punteroImg.src} 
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

        {/* Sección de Demostración Pasos Interactiva */}
        <section id="demo" className="max-w-7xl mx-auto mb-32 px-6 scroll-mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Pruébalo tú mismo. Reserva en 3 sencillos pasos
            </h2>
            <p className="text-slate-500 font-bold text-lg">
              Diseñado para ser utilizado por cualquier vecino, sin importar su edad.
            </p>
          </div>

          {isConfirmed ? (
            // PANTALLA DE CONFIRMACIÓN DE LA SIMULACIÓN
            <div className="max-w-2xl mx-auto glass-card p-12 rounded-[3rem] text-center shadow-2xl border-2 border-emerald-100 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-lg shadow-emerald-200">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2">¡Reserva Confirmada!</h3>
              <p className="text-slate-500 font-bold mb-8 italic">Se ha registrado correctamente (Simulación)</p>
              
              <div className="bg-slate-50 rounded-3xl p-8 text-left space-y-4 mb-8 border border-slate-100">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-400 font-bold uppercase text-xs">Instalación</span>
                  <span className="font-black text-slate-700">Pista de Pádel 1</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-400 font-bold uppercase text-xs">Fecha y Hora</span>
                  <span className="font-black text-slate-700">
                    {format(selectedDate, 'd MMMM yyyy', { locale: es })} · {selectedTime} ({duration}')
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold uppercase text-xs">Vecino</span>
                  <span className="font-black text-slate-700 uppercase">{nombre} · Portal {portal}, {piso} {letra}</span>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setIsConfirmed(false); 
                  setNombre('');
                  setPortal('');
                  setPiso('');
                  setLetra('');
                }}
                className="text-purple-600 font-black uppercase text-xs tracking-widest hover:underline transition-all"
              >
                Realizar otra prueba
              </button>
            </div>
          ) : (
            // LOS 3 PASOS INTERACTIVOS
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              
              {/* Paso 1: Calendario Interactivo */}
              <div className="flex flex-col items-center h-full">
                <span className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Paso 1: Elige el día</span>
                <div className="glass-card w-full max-w-[380px] p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-extrabold text-slate-800 capitalize">
                      {format(currentMonth, 'MMMM yyyy', { locale: es })}
                    </h3>
                    <div className="flex gap-2">
                      <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 hover:bg-slate-100 transition-colors"><ChevronLeft size={16} /></button>
                      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 hover:bg-slate-100 transition-colors"><ChevronRight size={16} /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 text-center text-[10px] font-black text-slate-300 mb-6 uppercase">
                    <div>L</div><div>M</div><div>X</div><div>J</div><div>V</div><div>S</div><div>D</div>
                  </div>
                  <div className="grid grid-cols-7 gap-y-4 text-center">
                    {calendarDays.map((day, idx) => {
                      const isSelected = isSameDay(day, selectedDate);
                      const isPast = isBefore(startOfDay(day), startOfDay(new Date()));
                      return (
                        <button key={idx} onClick={() => !isPast && setSelectedDate(day)} disabled={isPast}
                          className={`h-9 w-9 mx-auto rounded-full flex items-center justify-center text-xs font-bold transition-all
                            ${isSelected ? 'bg-purple-600 text-white shadow-lg shadow-purple-200 scale-110' : 'text-slate-600 hover:bg-purple-50 hover:text-purple-600'}
                            ${!isSameMonth(day, currentMonth) ? 'opacity-20' : 'opacity-100'}
                            ${isPast && isSameMonth(day, currentMonth) ? 'opacity-30 cursor-not-allowed line-through' : ''}`}>
                          {format(day, 'd')}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Paso 2: Horario Interactivo */}
              <div className="flex flex-col items-center h-full">
                <span className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Paso 2: Horario y Duración</span>
                <div className="glass-card w-full max-w-[380px] p-8 rounded-[2.5rem] shadow-xl border border-slate-100 text-center flex-1 flex flex-col">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Horario (Haz Scroll)</p>
                  
                  <div className="relative h-[160px] overflow-hidden mb-8 rounded-2xl">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                      <div className="w-full h-12 bg-purple-50/50 rounded-2xl border-y border-purple-100 shadow-sm" />
                    </div>
                    <div ref={scrollRef} onScroll={handleScroll} className="flex flex-col items-center gap-0 overflow-y-auto h-full scrollbar-hide py-[56px] snap-y snap-mandatory cursor-ns-resize">
                      {timeSlots.map((time) => (
                        <div key={time} onClick={() => {
                          setSelectedTime(time);
                          const idx = timeSlots.indexOf(time);
                          if (scrollRef.current) scrollRef.current.scrollTo({ top: idx * 48, behavior: 'smooth' });
                        }} className="snap-center h-12 flex items-center justify-center shrink-0 transition-all w-full px-2 cursor-pointer group">
                          <span className={`font-[800] tracking-tighter transition-all duration-300
                            ${selectedTime === time ? 'text-purple-600 scale-125 text-2xl' : 'text-slate-300 text-xl group-hover:text-purple-400'}`}>
                            {time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="grid grid-cols-4 gap-2 mb-6">
                      {[30, 60, 90, 120].map((opt) => (
                        <button key={opt} onClick={() => setDuration(opt)}
                          className={`py-3 rounded-2xl text-xs font-black border transition-all active:scale-95
                            ${duration === opt ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-200' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-purple-200 hover:text-purple-500'}`}>
                          {opt}'
                        </button>
                      ))}
                    </div>
                    <div className="bg-purple-50/50 py-3.5 rounded-2xl text-purple-600 text-[11px] font-bold border border-purple-100/50 transition-all">
                      ✓ {format(selectedDate, 'd MMM', { locale: es })} · {selectedTime} → {format(addMinutes(parse(selectedTime, 'HH:mm', new Date()), duration), 'HH:mm')} ({duration}')
                    </div>
                  </div>
                </div>
              </div>

              {/* Paso 3: Confirmación Interactiva */}
              <div className="flex flex-col items-center h-full">
                <span className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Paso 3: Identificación</span>
                <div className="glass-card w-full max-w-[380px] p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex-1 flex flex-col justify-center relative">
                  
                  <div className="space-y-6 flex-1 flex flex-col justify-center">
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 transition-colors focus-within:border-purple-300 focus-within:bg-white relative">
                      <input 
                        type="text" 
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="bg-transparent w-full text-center outline-none text-sm font-black text-slate-700 uppercase tracking-widest placeholder:text-slate-300" 
                        placeholder="NOMBRE VECINO" 
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <CustomSelect id="portal" value={portal} onChange={setPortal} placeholder="PORTAL" options={['1', '2', '3']} />
                      <CustomSelect id="piso" value={piso} onChange={setPiso} placeholder="PISO" options={['Bajo', '1', '2', '3', '4']} disabled={!portal} />
                      <CustomSelect id="letra" value={letra} onChange={setLetra} placeholder="LETRA" options={['A', 'B', 'C']} disabled={!piso} />
                    </div>
                  </div>

                  <button 
                    disabled={!isFormComplete}
                    onClick={() => setIsConfirmed(true)}
                    className={`w-full py-4 mt-8 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 transition-all
                      ${!isFormComplete ? 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none' : 'bg-purple-600 text-white shadow-purple-200 active:scale-95 hover:bg-purple-700'}`}
                  >
                    Confirmar <CheckCircle2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

{/* SECCIÓN: CARACTERÍSTICAS / VALOR REAL */}
<section id="caracteristicas" className="max-w-7xl mx-auto mb-40 px-6 scroll-mt-24">
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
    
    {/* Característica 1: Sin descargas */}
    <div className="glass-card p-8 rounded-[2.5rem] border border-slate-100 hover:border-purple-200 transition-all group">
      <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
        <Zap size={28} fill="currentColor" fillOpacity={0.2} />
      </div>
      <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">Sin descargas</h3>
      <p className="text-slate-500 font-medium leading-relaxed text-sm">
        Olvídate de App Store o Play Store. Los vecinos entran escaneando un <span className="text-purple-600 font-bold">código QR</span> o mediante un enlace directo. Cero fricción.
      </p>
    </div>

    {/* Característica 2: Reglas a medida */}
    <div className="glass-card p-8 rounded-[2.5rem] border border-slate-100 hover:border-purple-200 transition-all group">
      <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
        <LayoutGrid size={28} fill="currentColor" fillOpacity={0.2} />
      </div>
      <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">Reglas a medida</h3>
      <p className="text-slate-500 font-medium leading-relaxed text-sm">
        Cada urbanización es un mundo. Tú decides: horarios de apertura, duración de los turnos y <span className="text-purple-600 font-bold">máximo de reservas</span> por persona.
      </p>
    </div>

    {/* Característica 3: Histórico y Control */}
    <div className="glass-card p-8 rounded-[2.5rem] border border-slate-100 hover:border-purple-200 transition-all group">
      <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
        <Clock size={28} fill="currentColor" fillOpacity={0.2} />
      </div>
      <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">Histórico total</h3>
      <p className="text-slate-500 font-medium leading-relaxed text-sm">
        Se acabó el "yo no he sido". El administrador tiene acceso a un registro de quién ha reservado cada día. <span className="text-purple-600 font-bold">Transparencia absoluta</span> para la comunidad.
      </p>
    </div>

    {/* Característica 4: Multi-instalación */}
    <div className="glass-card p-8 rounded-[2.5rem] border border-slate-100 hover:border-purple-200 transition-all group">
      <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
        <Building size={28} fill="currentColor" fillOpacity={0.2} />
      </div>
      <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">Todo en uno</h3>
      <p className="text-slate-500 font-medium leading-relaxed text-sm">
        Pádel, tenis, gimnasio o incluso la barbacoa comunitaria. Gestiona <span className="text-purple-600 font-bold">todas las instalaciones</span> desde un único panel centralizado.
      </p>
    </div>

  </div>
</section>

        {/* FAQ Section */}
        <section id="faq" className="bg-white/60 backdrop-blur-md border-t border-slate-200 py-32">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-slate-900 text-center mb-12">Preguntas Frecuentes</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className={`bg-white border ${openFaq === index ? 'border-purple-500' : 'border-slate-200 hover:border-slate-300'} rounded-2xl overflow-hidden transition-all duration-300 shadow-sm`}>
                  <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex justify-between items-center p-6 text-left">
                    <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                    <ChevronDown className={`text-slate-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-purple-600' : ''}`} size={20} />
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
              <div className="flex items-center gap-3"><Mail className="text-purple-600" size={20} /><span>contacto@urbareserva.com</span></div>
              <div className="flex items-center gap-3"><MessageSquare className="text-emerald-500" size={20} /><span>Soporte WhatsApp</span></div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
            <h3 className="font-bold text-2xl text-slate-950 mb-8">Solicita una Demo</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" className="w-full bg-slate-50 border border-slate-100 text-slate-900 px-6 py-4 rounded-xl focus:border-purple-300 focus:outline-none" placeholder="Nombre de la Urbanización" />
              <input type="email" className="w-full bg-slate-50 border border-slate-100 text-slate-900 px-6 py-4 rounded-xl focus:border-purple-300 focus:outline-none" placeholder="Email de contacto" />
              <button className="w-full bg-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-500 transition-all flex items-center justify-center gap-2">Solicitar Demostración <ArrowRight size={20} /></button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
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