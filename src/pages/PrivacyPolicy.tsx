import { useLanguage } from '../context/LanguageContext';

export default function PrivacyPolicy() {
  const { language } = useLanguage();

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#001F20] to-[#003840] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'en' ? 'Privacy Policy' : language === 'ca' ? 'Política de Privacitat' : 'Política de Privacidad'}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
          {language === 'en' ? (
            <>
              <h2>1. Data Controller</h2>
              <p>
                <strong>Company name:</strong> OneReserve<br />
                <strong>Email:</strong> admin@onereserve.es<br />
                <strong>Website:</strong> onereserve.es
              </p>

              <h2>2. Data We Collect</h2>
              <p>
                Through the contact form on this website, we collect the following personal data:
              </p>
              <ul>
                <li>Full name</li>
                <li>Email address</li>
                <li>Message content</li>
              </ul>

              <h2>3. Purpose of Data Processing</h2>
              <p>
                The personal data collected is used exclusively to:
              </p>
              <ul>
                <li>Respond to enquiries submitted through the contact form</li>
                <li>Manage business relationships with potential clients</li>
              </ul>

              <h2>4. Legal Basis</h2>
              <p>
                The legal basis for processing your personal data is the consent given by the user when ticking the acceptance checkbox in the contact form.
              </p>

              <h2>5. Data Recipients</h2>
              <p>
                Your personal data will not be shared with third parties, except where legally required. Data may be stored using third-party cloud services with adequate security measures.
              </p>

              <h2>6. Data Retention</h2>
              <p>
                Personal data will be retained for the time necessary to fulfil the purpose for which it was collected and to meet any applicable legal obligations.
              </p>

              <h2>7. User Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul>
                <li><strong>Access</strong> your personal data</li>
                <li><strong>Rectify</strong> inaccurate data</li>
                <li><strong>Erasure</strong> – request deletion of your data</li>
                <li><strong>Restriction</strong> of processing</li>
                <li><strong>Data portability</strong></li>
                <li><strong>Object</strong> to the processing of your data</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at: <strong>admin@onereserve.es</strong>
              </p>

              <h2>8. Changes to This Policy</h2>
              <p>
                OneReserve reserves the right to update this privacy policy at any time. Any changes will be published on this page. We recommend reviewing this page periodically.
              </p>
            </>
          ) : language === 'ca' ? (
            <>
              <h2>1. Responsable del Tractament</h2>
              <p>
                <strong>Nom de l'empresa:</strong> OneReserve<br />
                <strong>Correu electrònic:</strong> admin@onereserve.es<br />
                <strong>Lloc web:</strong> onereserve.es
              </p>

              <h2>2. Dades que Recopilem</h2>
              <p>
                A través del formulari de contacte d'aquest lloc web, recopilem les següents dades personals:
              </p>
              <ul>
                <li>Nom complet</li>
                <li>Adreça de correu electrònic</li>
                <li>Contingut del missatge</li>
              </ul>

              <h2>3. Finalitat del Tractament</h2>
              <p>
                Les dades personals recollides s'utilitzen exclusivament per:
              </p>
              <ul>
                <li>Respondre les consultes enviades a través del formulari de contacte</li>
                <li>Gestionar la relació comercial amb clients potencials</li>
              </ul>

              <h2>4. Base Legal</h2>
              <p>
                La base legal per al tractament de les teves dades personals és el consentiment atorgat per l'usuari en marcar la casella d'acceptació del formulari de contacte.
              </p>

              <h2>5. Destinataris de les Dades</h2>
              <p>
                Les teves dades personals no seran cedides a tercers, excepte per obligació legal. Les dades poden ser emmagatzemades en serveis al núvol de tercers amb mesures de seguretat adequades.
              </p>

              <h2>6. Conservació de les Dades</h2>
              <p>
                Les dades personals es conservaran durant el temps necessari per complir amb la finalitat per a la qual van ser recollides i per atendre les obligacions legals aplicables.
              </p>

              <h2>7. Drets de l'Usuari</h2>
              <p>
                Tens dret a:
              </p>
              <ul>
                <li><strong>Accés</strong> a les teves dades personals</li>
                <li><strong>Rectificació</strong> de dades inexactes</li>
                <li><strong>Supressió</strong> – sol·licitar l'eliminació de les teves dades</li>
                <li><strong>Limitació</strong> del tractament</li>
                <li><strong>Portabilitat</strong> de les dades</li>
                <li><strong>Oposició</strong> al tractament de les teves dades</li>
              </ul>
              <p>
                Per exercir qualsevol d'aquests drets, contacta'ns a: <strong>admin@onereserve.es</strong>
              </p>

              <h2>8. Modificacions d'Aquesta Política</h2>
              <p>
                OneReserve es reserva el dret d'actualitzar aquesta política de privacitat en qualsevol moment. Qualsevol canvi serà publicat en aquesta pàgina. Recomanem revisar-la periòdicament.
              </p>
            </>
          ) : (
            <>
              <h2>1. Responsable del Tratamiento</h2>
              <p>
                <strong>Nombre de la empresa:</strong> OneReserve<br />
                <strong>Correo electrónico:</strong> admin@onereserve.es<br />
                <strong>Sitio web:</strong> onereserve.es
              </p>

              <h2>2. Datos que Recopilamos</h2>
              <p>
                A través del formulario de contacto de este sitio web, recopilamos los siguientes datos personales:
              </p>
              <ul>
                <li>Nombre completo</li>
                <li>Dirección de correo electrónico</li>
                <li>Contenido del mensaje</li>
              </ul>

              <h2>3. Finalidad del Tratamiento</h2>
              <p>
                Los datos personales recogidos se utilizan exclusivamente para:
              </p>
              <ul>
                <li>Responder a las consultas enviadas a través del formulario de contacto</li>
                <li>Gestionar la relación comercial con clientes potenciales</li>
              </ul>

              <h2>4. Base Legal</h2>
              <p>
                La base legal para el tratamiento de tus datos personales es el consentimiento otorgado por el usuario al marcar la casilla de aceptación del formulario de contacto.
              </p>

              <h2>5. Destinatarios de los Datos</h2>
              <p>
                Tus datos personales no serán cedidos a terceros, salvo obligación legal. Los datos pueden ser almacenados en servicios en la nube de terceros con medidas de seguridad adecuadas.
              </p>

              <h2>6. Conservación de los Datos</h2>
              <p>
                Los datos personales se conservarán durante el tiempo necesario para cumplir con la finalidad para la que fueron recogidos y para atender las obligaciones legales aplicables.
              </p>

              <h2>7. Derechos del Usuario</h2>
              <p>
                Tienes derecho a:
              </p>
              <ul>
                <li><strong>Acceso</strong> a tus datos personales</li>
                <li><strong>Rectificación</strong> de datos inexactos</li>
                <li><strong>Supresión</strong> – solicitar la eliminación de tus datos</li>
                <li><strong>Limitación</strong> del tratamiento</li>
                <li><strong>Portabilidad</strong> de los datos</li>
                <li><strong>Oposición</strong> al tratamiento de tus datos</li>
              </ul>
              <p>
                Para ejercer cualquiera de estos derechos, contáctanos en: <strong>admin@onereserve.es</strong>
              </p>

              <h2>8. Modificaciones de Esta Política</h2>
              <p>
                OneReserve se reserva el derecho de actualizar esta política de privacidad en cualquier momento. Cualquier cambio será publicado en esta página. Recomendamos revisarla periódicamente.
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
