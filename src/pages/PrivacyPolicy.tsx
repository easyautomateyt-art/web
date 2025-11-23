import { useLanguage } from '../context/LanguageContext';

export default function PrivacyPolicy() {
  const { language } = useLanguage();

  return (
    <div className="pt-16 pb-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">2. {language === 'es' ? 'Política de Privacidad' : 'Política de Privacitat'}</h1>
        <p className="text-sm text-gray-700 mb-6">Última actualización: 12 de noviembre de 2025</p>

        <section className="prose max-w-none text-black">
          <h2>{language === 'es' ? 'Responsable del tratamiento' : 'Responsable del tractament'}</h2>
          <p>
            {language === 'es' ? 'Titular: Sergi Puig Márquez (OneReserve)' : 'Titular: Sergi Puig Márquez (OneReserve)'}
          </p>
          <ul>
            <li>NIF: 41642809K</li>
            <li>{language === 'es' ? 'Domicilio: C/ Rasa 4, 3r 4a' : 'Domicili: C/ Rasa 4, 3r 4a'}</li>
            <li>{language === 'es' ? 'Teléfono: 611 539 641' : 'Telèfon: 611 539 641'}</li>
            <li>{language === 'es' ? 'Correo electrónico (Privacidad/DPO): dpo@onereserve.es' : "Correu electrònic (Privacitat/DPO): dpo@onereserve.es"}</li>
          </ul>

          <h2>{language === 'es' ? 'Finalidad del tratamiento' : 'Finalitat del tractament'}</h2>
          <ul>
            <li>{language === 'es' ? 'Prestación del servicio de reservas.' : 'Prestació del servei de reserves.'}</li>
            <li>{language === 'es' ? 'Envío de recordatorios automáticos.' : 'Enviament de recordatoris automàtics.'}</li>
            <li>{language === 'es' ? 'Analítica interna y mejora de servicios mediante datos anonimizados.' : "Analítica interna i millora de serveis mitjançant dades anonimatzades."}</li>
            <li>{language === 'es' ? 'Gestión administrativa, fiscal y de soporte con los negocios.' : 'Gestió administrativa, fiscal i de suport amb els negocis.'}</li>
          </ul>

          <h2>{language === 'es' ? 'Legitimación' : 'Legitimació'}</h2>
          <p>{language === 'es' ? 'Ejecución de contrato o precontrato (art. 6.1.b RGPD). Interés legítimo para análisis internos no invasivos. Cumplimiento de obligaciones legales (art. 6.1.c RGPD).' : "Execució de contracte o precontracte (art. 6.1.b RGPD). Interès legítim per a anàlisis interns no invasius. Compliment d'obligacions legals (art. 6.1.c RGPD)."}</p>

          <h2>{language === 'es' ? 'Datos tratados' : 'Dades tractades'}</h2>
          <p>{language === 'es' ? 'Nombre, teléfono, correo electrónico, hora de reserva, mensaje opcional, y datos de pedido si aplica. Los datos de WhatsApp se tratan únicamente para gestionar reservas y se almacenan en bases separadas. No se recogen direcciones IP ni datos de geolocalización.' : "Nom, telèfon, correu electrònic, hora de reserva, missatge opcional i dades de comanda si escau. Les dades de WhatsApp es tracten únicament per gestionar reserves i s'emmagatzemen en bases separades. No es recullen adreces IP ni dades de geolocalització."}</p>

          <h2>{language === 'es' ? 'Destinatarios' : 'Destinataris'}</h2>
          <p>{language === 'es' ? 'Los negocios responsables de las reservas. Proveedor tecnológico: Hostinger International Ltd. (VPS París, Francia, UE). No se ceden datos a terceros ajenos ni se realizan transferencias internacionales fuera de la UE.' : "Els negocis responsables de les reserves. Proveïdor tecnològic: Hostinger International Ltd. (VPS París, França, UE). No es cedeixen dades a tercers aliens ni es realitzen transferències internacionals fora de la UE."}</p>

          <h2>{language === 'es' ? 'Conservación' : 'Conservació'}</h2>
          <p>{language === 'es' ? 'Los datos se conservan mientras dure la relación comercial y durante los plazos legales mínimos. Los datos analíticos se mantienen anonimizados.' : "Les dades es conserven mentre duri la relació comercial i durant els terminis legals mínims. Les dades analítiques es mantenen anonimatzades."}</p>

          <h2>{language === 'es' ? 'Derechos de los interesados' : "Drets dels interessats"}</h2>
          <p>{language === 'es' ? 'Puede ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a dpo@onereserve.es. Los clientes finales deberán dirigirse al negocio responsable de su reserva. También puede reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).' : "Pot exercir els drets d'accés, rectificació, supressió, oposició, limitació i portabilitat escrivint a dpo@onereserve.es. Els clients finals hauran d'adreçar-se al negoci responsable de la seva reserva. També pot reclamar davant l'Agència Espanyola de Protecció de Dades (www.aepd.es)."}</p>

          <h2>{language === 'es' ? 'Seguridad' : 'Seguretat'}</h2>
          <p>{language === 'es' ? 'OneReserve aplica medidas técnicas y organizativas adecuadas: cifrado SSL/TLS, control de accesos, segmentación de datos, copias de seguridad diarias y procedimientos de gestión de incidentes.' : "OneReserve aplica mesures tècniques i organitzatives adequades: xifrat SSL/TLS, control d'accessos, segmentació de dades, còpies de seguretat diàries i procediments de gestió d'incidents."}</p>

          <h2>{language === 'es' ? 'Menores' : 'Menors'}</h2>
          <p>{language === 'es' ? 'El servicio no está dirigido a menores de 16 años. Los datos detectados de menores serán suprimidos.' : "El servei no està dirigit a menors de 16 anys. Les dades detectades de menors seran suprimides."}</p>

          <h2>{language === 'es' ? 'Cambios' : 'Canvis'}</h2>
          <p>{language === 'es' ? 'Cualquier modificación se publicará en esta página, indicando la fecha de actualización.' : "Qualsevol modificació es publicarà en aquesta pàgina, indicant la data d'actualització."}</p>
        </section>
      </div>
    </div>
  );
}
