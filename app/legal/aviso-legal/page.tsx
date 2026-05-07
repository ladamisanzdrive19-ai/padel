export default function AvisoLegal() {
    return (
      <>
        <h1 className="text-4xl font-extrabold mb-8 tracking-tight">Aviso Legal</h1>
        <section className="space-y-6 text-lg leading-relaxed">
          <p>En cumplimiento de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), se informa a los usuarios de los datos del titular de este sitio web:</p>
          <ul className="bg-slate-50 p-6 rounded-2xl list-none space-y-2 border border-slate-100">
            <li><strong>Responsable:</strong> [Tu Nombre y Apellidos]</li>
            <li><strong>DNI:</strong> [Tu DNI]</li>
            <li><strong>Domicilio:</strong> [Tu Dirección completa]</li>
            <li><strong>Contacto:</strong> [Tu Email de contacto]</li>
          </ul>
          <h2 className="text-2xl font-bold pt-6">Condiciones de Uso</h2>
          <p>El uso de UrbaReserva implica la aceptación de estas condiciones. El titular se reserva el derecho a modificar el contenido del sitio sin previo aviso.</p>
          <h2 className="text-2xl font-bold pt-6">Propiedad Intelectual</h2>
          <p>El código fuente, los diseños gráficos y los textos de esta plataforma son propiedad exclusiva del titular. Queda prohibida su reproducción total o parcial sin autorización expresa.</p>
        </section>
      </>
    );
  }