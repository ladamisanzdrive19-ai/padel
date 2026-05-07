'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, eachDayOfInterval, addMinutes, parse, isBefore, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { CheckCircle2, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export default function InteractiveDemo() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('16:30');
  const [duration, setDuration] = useState(90);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const [nombre, setNombre] = useState('');
  const [portal, setPortal] = useState('');
  const [piso, setPiso] = useState('');
  const [letra, setLetra] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

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

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    if (openDropdown) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openDropdown]);

  // Novedad: Auto-Scroll hacia arriba al confirmar
  useEffect(() => {
    if (isConfirmed) {
      const demoSection = document.getElementById('demo');
      if (demoSection) {
        // Calcula la posición y hace un scroll suave para centrar la tarjeta
        const y = demoSection.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [isConfirmed]);

  const CustomSelect = ({ id, value, onChange, placeholder, options, disabled = false }: { id: string; value: string; onChange: (v: string) => void; placeholder: string; options: string[]; disabled?: boolean; }) => {
    const isOpen = openDropdown === id;
    return (
      <div className="relative w-full" onClick={(e) => e.stopPropagation()}>
        <button type="button" disabled={disabled} onClick={() => setOpenDropdown(isOpen ? null : id)} className={`w-full p-4 bg-white rounded-2xl text-center font-black text-xs border transition-all flex items-center justify-center gap-1 shadow-sm ${disabled ? 'opacity-30 cursor-not-allowed border-slate-100' : 'cursor-pointer hover:border-purple-200 border-slate-100'} ${value ? 'text-slate-800' : 'text-slate-400'} ${isOpen ? 'border-purple-300 bg-purple-50/50' : ''}`}>
          {value || placeholder}
          <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-purple-600' : 'text-purple-400'}`} />
        </button>
        {isOpen && (
          <div className="absolute z-[200] top-full mt-2 left-0 right-0 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-xl overflow-hidden">
            {options.map((opt) => (
              <button key={opt} type="button" onClick={() => { onChange(opt); setOpenDropdown(null); }} className={`w-full py-3 text-xs font-black text-center transition-all hover:bg-purple-50 hover:text-purple-600 ${value === opt ? 'bg-purple-600 text-white hover:bg-purple-600 hover:text-white' : 'text-slate-600'}`}>
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const isFormComplete = nombre && portal && piso && letra;

  if (isConfirmed) {
    return (
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
            <span className="font-black text-slate-700">{format(selectedDate, 'd MMMM yyyy', { locale: es })} · {selectedTime} ({duration}')</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 font-bold uppercase text-xs">Vecino</span>
            <span className="font-black text-slate-700 uppercase">{nombre} · Portal {portal}, {piso} {letra}</span>
          </div>
        </div>
        <button onClick={() => { setIsConfirmed(false); setNombre(''); setPortal(''); setPiso(''); setLetra(''); }} className="text-purple-600 font-black uppercase text-xs tracking-widest hover:underline transition-all">
          Realizar otra prueba
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
      <div className="flex flex-col items-center h-full">
        <span className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Paso 1: Elige el día</span>
        <div className="glass-card w-full max-w-[380px] p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-extrabold text-slate-800 capitalize">{format(currentMonth, 'MMMM yyyy', { locale: es })}</h3>
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
                <button key={idx} onClick={() => !isPast && setSelectedDate(day)} disabled={isPast} className={`h-9 w-9 mx-auto rounded-full flex items-center justify-center text-xs font-bold transition-all ${isSelected ? 'bg-purple-600 text-white shadow-lg shadow-purple-200 scale-110' : 'text-slate-600 hover:bg-purple-50 hover:text-purple-600'} ${!isSameMonth(day, currentMonth) ? 'opacity-20' : 'opacity-100'} ${isPast && isSameMonth(day, currentMonth) ? 'opacity-30 cursor-not-allowed line-through' : ''}`}>
                  {format(day, 'd')}
                </button>
              );
            })}
          </div>
        </div>
      </div>
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
                <div key={time} onClick={() => { setSelectedTime(time); const idx = timeSlots.indexOf(time); if (scrollRef.current) scrollRef.current.scrollTo({ top: idx * 48, behavior: 'smooth' }); }} className="snap-center h-12 flex items-center justify-center shrink-0 transition-all w-full px-2 cursor-pointer group">
                  <span className={`font-[800] tracking-tighter transition-all duration-300 ${selectedTime === time ? 'text-purple-600 scale-125 text-2xl' : 'text-slate-300 text-xl group-hover:text-purple-400'}`}>{time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto">
            <div className="grid grid-cols-4 gap-2 mb-6">
              {[30, 60, 90, 120].map((opt) => (
                <button key={opt} onClick={() => setDuration(opt)} className={`py-3 rounded-2xl text-xs font-black border transition-all active:scale-95 ${duration === opt ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-200' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-purple-200 hover:text-purple-500'}`}>{opt}'</button>
              ))}
            </div>
            <div className="bg-purple-50/50 py-3.5 rounded-2xl text-purple-600 text-[11px] font-bold border border-purple-100/50 transition-all">
              ✓ {format(selectedDate, 'd MMM', { locale: es })} · {selectedTime} → {format(addMinutes(parse(selectedTime, 'HH:mm', new Date()), duration), 'HH:mm')} ({duration}')
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center h-full">
        <span className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Paso 3: Identificación</span>
        <div className="glass-card w-full max-w-[380px] p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex-1 flex flex-col justify-center relative">
          <div className="space-y-6 flex-1 flex flex-col justify-center">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 transition-colors focus-within:border-purple-300 focus-within:bg-white relative">
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="bg-transparent w-full text-center outline-none text-sm font-black text-slate-700 uppercase tracking-widest placeholder:text-slate-300" placeholder="NOMBRE VECINO" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <CustomSelect id="portal" value={portal} onChange={setPortal} placeholder="PORTAL" options={['1', '2', '3']} />
              <CustomSelect id="piso" value={piso} onChange={setPiso} placeholder="PISO" options={['Bajo', '1', '2', '3', '4']} disabled={!portal} />
              <CustomSelect id="letra" value={letra} onChange={setLetra} placeholder="LETRA" options={['A', 'B', 'C']} disabled={!piso} />
            </div>
          </div>
          <button disabled={!isFormComplete} onClick={() => setIsConfirmed(true)} className={`w-full py-4 mt-8 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 transition-all ${!isFormComplete ? 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none' : 'bg-purple-600 text-white shadow-purple-200 active:scale-95 hover:bg-purple-700'}`}>
            Confirmar <CheckCircle2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}