'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: "¿Los vecinos tienen que instalar alguna aplicación?", a: "No. Los vecinos acceden a través de un enlace web o escaneando un código QR. Funciona como una app nativa en su móvil, pero sin descargas ni registros." },
    { q: "¿Qué pasa con los vecinos que no se llevan bien con la tecnología?", a: "La interfaz es tan simple que si saben usar WhatsApp, saben reservar. Solo tienen que tocar la hora que quieren y confirmar." },
    { q: "¿Podemos poner nuestras propias normas de la urbanización?", a: "Por supuesto. Podéis decidir cuántos días de antelación se permite reservar, la duración máxima del turno y el horario de apertura." },
    { q: "¿Cómo se justifica este gasto a los vecinos?", a: "UrbaReserva pacifica la convivencia. Evita conflictos, automatiza turnos y profesionaliza la gestión de las zonas comunes." }
  ];

  return (
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
  );
}