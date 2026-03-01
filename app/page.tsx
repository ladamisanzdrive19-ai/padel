'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
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
  startOfDay,
} from 'date-fns';
import { es } from 'date-fns/locale';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  X,
  Trash2,
} from 'lucide-react';

const supabaseUrl = 'https://wlxjlzwsdydnanknqfwv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndseGpsendzZHlkbmFua25xZnd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMTI5MTYsImV4cCI6MjA4Nzg4ODkxNn0.6IAFmrfSGb45AG_ZVIAMgc-Zvm6qTFY1iX781RzhZpg';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function PadelProFinal() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [duration, setDuration] = useState(60);
  const [reservasExistentes, setReservasExistentes] = useState<any[]>([]);
  const [nombre, setNombre] = useState('');
  const [portal, setPortal] = useState('');
  const [piso, setPiso] = useState('');
  const [letra, setLetra] = useState('');
  const [loading, setLoading] = useState(false);
  const [cancelCode, setCancelCode] = useState('');
  const [cancelLoading, setCancelLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ─── Cargar reservas ──────────────────────────────────────────────────────
  useEffect(() => {
    const cargarReservas = async () => {
      const fechaFormateada = format(selectedDate, 'yyyy-MM-dd');
      const { data, error } = await supabase
        .from('reservas')
        .select('*')
        .eq('fecha', fechaFormateada);
      if (error) {
        console.error('❌ ERROR DE SUPABASE:', error.message);
      } else {
        setReservasExistentes(data || []);
      }
    };
    cargarReservas();
  }, [selectedDate]);

  // ─── FIX: useCallback para declarar antes de los useEffect que las usan ──

  const isSlotOccupied = useCallback((time: string) => {
    return reservasExistentes.some((res) => {
      if (!res.hora_inicio || !res.hora_fin) return false;
      const inicio = parse(res.hora_inicio.substring(0, 5), 'HH:mm', selectedDate);
      const fin = parse(res.hora_fin.substring(0, 5), 'HH:mm', selectedDate);
      const slotInicio = parse(time, 'HH:mm', selectedDate);
      const slotFin = addMinutes(slotInicio, 30);
      return slotInicio < fin && slotFin > inicio;
    });
  }, [reservasExistentes, selectedDate]);

  const isBookingValid = useCallback((time: string, dur: number) => {
    const inicio = parse(time, 'HH:mm', selectedDate);
    const fin = addMinutes(inicio, dur);
    return !reservasExistentes.some((res) => {
      if (!res.hora_inicio || !res.hora_fin) return false;
      const resInicio = parse(res.hora_inicio.substring(0, 5), 'HH:mm', selectedDate);
      const resFin = parse(res.hora_fin.substring(0, 5), 'HH:mm', selectedDate);
      return inicio < resFin && fin > resInicio;
    });
  }, [reservasExistentes, selectedDate]);

  // Reset duración si la combinación actual genera solapamiento
  useEffect(() => {
    if (!isBookingValid(selectedTime, duration)) {
      const validDuration = [30, 60, 90, 120].find((d) => isBookingValid(selectedTime, d));
      setDuration(validDuration ?? 30);
    }
  }, [selectedTime, isBookingValid]);

  // ─── Confirmar reserva ────────────────────────────────────────────────────
  const handleConfirm = async () => {
    if (!nombre || !portal || !piso || !letra) {
      alert('Por favor, completa todos los campos de contacto.');
      return;
    }
    if (!isBookingValid(selectedTime, duration)) {
      alert('El horario seleccionado se solapa con una reserva existente.');
      return;
    }
    const bookingStart = parse(selectedTime, 'HH:mm', selectedDate);
    if (isBefore(bookingStart, new Date())) {
      alert('No puedes reservar en una hora pasada.');
      return;
    }

    setLoading(true);
    const horaFin = format(addMinutes(parse(selectedTime, 'HH:mm', new Date()), duration), 'HH:mm');
    const codigoCancelacion = Math.floor(1000 + Math.random() * 9000).toString();

    const { error } = await supabase.from('reservas').insert([{
      fecha: format(selectedDate, 'yyyy-MM-dd'),
      hora_inicio: selectedTime,
      hora_fin: horaFin,
      portal,
      piso,
      puerta: letra,
      nombre,
      contacto: 'N/A',
      codigo_cancelacion: codigoCancelacion,
    }]);

    setLoading(false);
    if (error) {
      alert('Error al guardar. Revisa la conexión o si ya tienes una reserva.');
    } else {
      alert(`¡Confirmada!\nCódigo de cancelación: ${codigoCancelacion}`);
      window.location.reload();
    }
  };

  // ─── Cancelar reserva ─────────────────────────────────────────────────────
  const handleCancel = async () => {
    if (!cancelCode) {
      alert('Introduce el código de cancelación de 4 dígitos.');
      return;
    }
    setCancelLoading(true);
    const { data, error } = await supabase
      .from('reservas')
      .delete()
      .eq('codigo_cancelacion', cancelCode)
      .select();

    setCancelLoading(false);
    if (error) {
      alert('Error al intentar cancelar.');
    } else if (data && data.length > 0) {
      alert('Reserva cancelada correctamente.');
      window.location.reload();
    } else {
      alert('No se encontró ninguna reserva con ese código.');
    }
  };

  // ─── Calendario ───────────────────────────────────────────────────────────
  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const today = startOfDay(new Date());

  // ─── Slots de tiempo ──────────────────────────────────────────────────────
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let h = 8; h <= 22; h++) {
      slots.push(`${h.toString().padStart(2, '0')}:00`, `${h.toString().padStart(2, '0')}:30`);
    }
    return slots;
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollTop / 56);
      if (timeSlots[index]) setSelectedTime(timeSlots[index]);
    }
  };

  // ─── Custom Dropdown ──────────────────────────────────────────────────────
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    if (openDropdown) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openDropdown]);

  const CustomSelect = ({
    id, value, onChange, placeholder, options, disabled = false,
  }: {
    id: string; value: string; onChange: (v: string) => void;
    placeholder: string; options: string[]; disabled?: boolean;
  }) => {
    const isOpen = openDropdown === id;
    return (
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpenDropdown(isOpen ? null : id)}
          className={`w-full p-4 bg-slate-50/50 rounded-2xl text-center font-black text-xs border transition-all flex items-center justify-center gap-1
            ${disabled ? 'opacity-30 cursor-not-allowed border-slate-100' : 'cursor-pointer hover:border-purple-200 border-slate-100'}
            ${value ? 'text-slate-700' : 'text-slate-300'}
            ${isOpen ? 'border-purple-300 bg-purple-50/50' : ''}`}
        >
          {value || placeholder}
          <span className={`text-[8px] transition-transform duration-200 inline-block ${isOpen ? 'rotate-180' : ''} ${value ? 'text-slate-400' : 'text-slate-300'}`}>▾</span>
        </button>
        {isOpen && (
          <div className="absolute z-[200] top-full mt-2 left-0 right-0 bg-white/95 backdrop-blur-xl border border-white/90 rounded-2xl shadow-xl shadow-purple-100/50 overflow-hidden">
            {options.map((opt) => (
              <button key={opt} type="button"
                onClick={() => { onChange(opt); setOpenDropdown(null); }}
                className={`w-full py-3 text-xs font-black text-center transition-all hover:bg-purple-50 hover:text-purple-600
                  ${value === opt ? 'bg-purple-600 text-white' : 'text-slate-600'}`}>
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ─── Resumen reserva ──────────────────────────────────────────────────────
  const endTime = format(addMinutes(parse(selectedTime, 'HH:mm', new Date()), duration), 'HH:mm');
  const bookingIsValid = isBookingValid(selectedTime, duration);

  return (
    <div className="min-h-screen bg-[#FDFEFF] text-[#0F172A] pb-20 relative overflow-hidden antialiased font-[var(--font-jakarta),_sans-serif]">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="blob-1 absolute top-[-15%] left-[-10%] w-[70%] h-[70%] bg-purple-300/30 rounded-full blur-[140px]" />
        <div className="blob-2 absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-violet-200/40 rounded-full blur-[120px]" />
        <div className="blob-3 absolute top-[35%] right-[0%] w-[45%] h-[45%] bg-indigo-200/25 rounded-full blur-[100px]" />
      </div>

      <style jsx global>{`
        .light-glass { background: rgba(255, 255, 255, 0.72); backdrop-filter: blur(25px); border: 1px solid rgba(255, 255, 255, 0.95); box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.04); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        @keyframes blobFloat {
          0%, 100% { transform: scale(1) translate(0px, 0px); opacity: 0.7; }
          33% { transform: scale(1.07) translate(20px, -15px); opacity: 1; }
          66% { transform: scale(0.95) translate(-15px, 10px); opacity: 0.5; }
        }
        .blob-1 { animation: blobFloat 8s ease-in-out infinite; }
        .blob-2 { animation: blobFloat 11s ease-in-out infinite reverse; animation-delay: -3s; }
        .blob-3 { animation: blobFloat 14s ease-in-out infinite; animation-delay: -6s; }
      `}</style>

      <header className="relative z-10 pt-10 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-[800] tracking-tighter mb-2 bg-gradient-to-b from-slate-900 to-slate-600 bg-clip-text text-transparent">
          Reserva <span className="text-purple-600 italic">Pádel</span>
        </h1>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Calle Ramón y Cajal 25, Alcobendas</p>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">

        {/* ── Calendario ── */}
        <div className="lg:col-span-7">
          <section className="light-glass p-5 sm:p-8 rounded-[2rem] sm:rounded-[3rem]">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-base sm:text-xl font-[800] text-slate-800 capitalize tracking-tight">
                {format(currentMonth, 'MMMM yyyy', { locale: es })}
              </h2>
              <div className="flex gap-2">
                <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-sm text-slate-400"><ChevronLeft size={18} /></button>
                <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-sm text-slate-400"><ChevronRight size={18} /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-0.5 sm:gap-1 text-center">
              {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day) => (
                <div key={day} className="text-[10px] font-black text-slate-300 mb-4">{day}</div>
              ))}
              {calendarDays.map((day, idx) => {
                const isSelected = isSameDay(day, selectedDate);
                const isPast = isBefore(startOfDay(day), today);
                return (
                  <button key={idx} onClick={() => !isPast && setSelectedDate(day)} disabled={isPast}
                    className={`h-8 w-8 sm:h-10 sm:w-10 mx-auto rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all
                      ${isSelected ? 'bg-purple-600 text-white shadow-lg shadow-purple-100' : 'text-slate-600 hover:bg-purple-50 hover:text-purple-600'}
                      ${!isSameMonth(day, currentMonth) ? 'opacity-10' : 'opacity-100'}
                      ${isPast && isSameMonth(day, currentMonth) ? 'opacity-25 cursor-not-allowed line-through' : ''}`}>
                    {format(day, 'd')}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* ── Horario + Formulario ── */}
        <div className="lg:col-span-5 space-y-5 sm:space-y-8">
          <section className="light-glass p-5 sm:p-8 rounded-[2rem] sm:rounded-[3rem]">
            <h3 className="text-center font-black text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-4">HORARIO</h3>
            <div className="relative h-44 overflow-hidden mb-8">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="w-full h-12 bg-purple-50/50 rounded-2xl border-y border-purple-100 shadow-sm" />
              </div>
              <div ref={scrollRef} onScroll={handleScroll}
                className="flex flex-col items-center gap-2 overflow-y-auto h-full scrollbar-hide py-16 snap-y snap-mandatory">
                {timeSlots.map((time) => {
                  const ocupado = isSlotOccupied(time);
                  return (
                    <div key={time} className="snap-center h-12 flex items-center justify-center shrink-0 transition-all w-full px-2">
                      <span className={`font-[800] tracking-tighter transition-all
                        ${ocupado ? 'text-slate-300 text-base' : selectedTime === time ? 'text-purple-600 scale-110 text-3xl' : 'text-slate-200 text-3xl'}`}>
                        {time}
                      </span>
                      {/* ✅ FIX: null check añadido en el find */}
                      {ocupado && (() => {
                        const res = reservasExistentes.find((r) => {
                          if (!r.hora_inicio || !r.hora_fin) return false;
                          const resInicio = parse(r.hora_inicio.substring(0, 5), 'HH:mm', selectedDate);
                          const resFin = parse(r.hora_fin.substring(0, 5), 'HH:mm', selectedDate);
                          const slotInicio = parse(time, 'HH:mm', selectedDate);
                          return slotInicio >= resInicio && slotInicio < resFin;
                        });
                        return (
                          <span className="ml-2 flex items-center gap-1 text-[10px] font-black text-red-400 whitespace-nowrap">
                            <X size={10} className="shrink-0" />
                            {res ? `Portal ${res.portal}, ${res.piso}${res.puerta}` : ''}
                          </span>
                        );
                      })()}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Duración */}
            <div className="grid grid-cols-4 gap-2">
              {[30, 60, 90, 120].map((opt) => {
                const invalido = !isBookingValid(selectedTime, opt);
                return (
                  <button key={opt} onClick={() => !invalido && setDuration(opt)} disabled={invalido}
                    title={invalido ? 'Se solapa con una reserva existente' : `${opt} minutos`}
                    className={`py-4 rounded-2xl text-[10px] font-black border transition-all
                      ${duration === opt ? 'bg-purple-600 border-purple-600 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-400 hover:border-purple-200'}
                      ${invalido ? 'opacity-25 cursor-not-allowed line-through' : ''}`}>
                    {opt}'
                  </button>
                );
              })}
            </div>

            {/* Resumen */}
            <div className={`mt-6 p-4 rounded-2xl text-center text-xs font-bold transition-all
              ${bookingIsValid ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-red-50 text-red-400 border border-red-100'}`}>
              {bookingIsValid
                ? `✓ ${format(selectedDate, 'd MMM', { locale: es })} · ${selectedTime} → ${endTime} (${duration}')`
                : `✗ Esta franja se solapa con otra reserva`}
            </div>
          </section>

          {/* Formulario datos */}
          <section className="light-glass p-5 sm:p-8 rounded-[2rem] sm:rounded-[3rem] relative z-10">
            <div className="space-y-4">
              <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                <input value={nombre} onChange={(e) => setNombre(e.target.value.toUpperCase())}
                  className="bg-transparent w-full outline-none font-bold text-sm text-slate-700 placeholder:text-slate-300"
                  placeholder="NOMBRE VECINO" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <CustomSelect id="portal" value={portal} onChange={(v) => { setPortal(v); setPiso(''); setLetra(''); }} placeholder="PORTAL" options={['1', '2', '3']} />
                <CustomSelect id="piso" value={piso} onChange={(v) => { setPiso(v); setLetra(''); }} placeholder="PISO" options={['Bajo', '1', '2', '3', '4']} disabled={!portal} />
                <CustomSelect id="letra" value={letra} onChange={(v) => setLetra(v)} placeholder="LETRA" options={['A', 'B', 'C']} disabled={!piso} />
              </div>
              <button onClick={handleConfirm}
                disabled={loading || !bookingIsValid || !nombre || !portal || !piso || !letra}
                className={`w-full text-white p-5 rounded-[2rem] font-[800] text-sm shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3 mt-2 tracking-widest
                  ${loading || !bookingIsValid || !nombre || !portal || !piso || !letra ? 'bg-slate-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}>
                {loading ? 'GUARDANDO...' : 'CONFIRMAR'} <CheckCircle size={18} />
              </button>
            </div>
          </section>

          {/* Cancelar reserva */}
          <section className="light-glass p-5 sm:p-8 rounded-[2rem] sm:rounded-[3rem]">
            <h3 className="text-center font-black text-[10px] uppercase tracking-[0.3em] text-slate-300 mb-6">¿CANCELAR RESERVA?</h3>
            <div className="flex gap-2">
              <input
                value={cancelCode}
                onChange={(e) => setCancelCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="bg-slate-50/50 w-full p-4 rounded-2xl border border-slate-100 font-bold text-xs outline-none text-center placeholder:text-slate-200 tracking-[0.3em]"
                placeholder="CÓDIGO DE 4 DÍGITOS"
                maxLength={4}
                inputMode="numeric"
              />
              <button
                onClick={handleCancel}
                disabled={cancelLoading || cancelCode.length < 4}
                className={`px-6 rounded-2xl font-black text-[10px] transition-all flex items-center justify-center
                  ${cancelLoading || cancelCode.length < 4 ? 'bg-slate-50 text-slate-200 cursor-not-allowed' : 'bg-red-50 text-red-500 hover:bg-red-100'}`}>
                {cancelLoading ? '...' : <Trash2 size={16} />}
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}