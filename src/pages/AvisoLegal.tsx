import { useLanguage } from '../context/LanguageContext';

export default function AvisoLegal() {
  const { language } = useLanguage();

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#001F20] to-[#003840] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'en' ? 'Legal Notice' : language === 'ca' ? 'Avís Legal' : 'Aviso Legal'}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
          {language === 'en' ? (
            <>
              <h2>1. Website Owner Identification</h2>
              <p>
                <strong>Company name:</strong> OneReserve<br />
                <strong>Email:</strong> admin@onereserve.es<br />
                <strong>Website:</strong> onereserve.es
              </p>

              <h2>2. Purpose</h2>
              <p>
                This website has been created by OneReserve with the purpose of providing information about our business management services and enabling contact with potential customers.
              </p>

              <h2>3. Terms of Use</h2>
              <p>
                By browsing this website, the user agrees to comply with the conditions of use set out in this legal notice. The user should cease using this website if they do not agree with any of the stated conditions.
              </p>

              <h2>4. Intellectual Property</h2>
              <p>
                All content on this website, including but not limited to texts, images, graphic designs, logos, icons, software and any other material, is the property of OneReserve or its licensors and is protected by intellectual and industrial property laws. Reproduction, distribution, modification or public communication of any content without the express written permission of OneReserve is strictly prohibited.
              </p>

              <h2>5. Limitation of Liability</h2>
              <p>
                OneReserve shall not be held liable for any damages that may arise from the use of this website, including but not limited to damages caused by errors or omissions in the content, lack of availability of the website, or the transmission of viruses or malicious software.
              </p>

              <h2>6. Amendments</h2>
              <p>
                OneReserve reserves the right to modify, at any time and without prior notice, the presentation and configuration of this website, as well as this legal notice. The user is therefore advised to review this text periodically.
              </p>
            </>
          ) : language === 'ca' ? (
            <>
              <h2>1. Identificació del Titular del Lloc Web</h2>
              <p>
                <strong>Nom de l'empresa:</strong> OneReserve<br />
                <strong>Correu electrònic:</strong> admin@onereserve.es<br />
                <strong>Lloc web:</strong> onereserve.es
              </p>

              <h2>2. Objecte</h2>
              <p>
                Aquest lloc web ha estat creat per OneReserve amb la finalitat de proporcionar informació sobre els nostres serveis de gestió empresarial i facilitar el contacte amb potencials clients.
              </p>

              <h2>3. Condicions d'Ús</h2>
              <p>
                En navegar per aquest lloc web, l'usuari accepta les condicions d'ús establertes en aquest avís legal. L'usuari ha de deixar d'utilitzar aquest lloc web si no està d'acord amb alguna de les condicions indicades.
              </p>

              <h2>4. Propietat Intel·lectual</h2>
              <p>
                Tots els continguts d'aquest lloc web, incloent-hi textos, imatges, dissenys gràfics, logotips, icones, programari i qualsevol altre material, són propietat de OneReserve o dels seus llicenciadors i estan protegits per les lleis de propietat intel·lectual i industrial. Queda prohibida la seva reproducció, distribució, modificació o comunicació pública sense l'autorització expressa i per escrit de OneReserve.
              </p>

              <h2>5. Limitació de Responsabilitat</h2>
              <p>
                OneReserve no serà responsable dels danys que puguin derivar-se de l'ús d'aquest lloc web, incloent-hi els danys causats per errors o omissions en el contingut, la falta de disponibilitat del lloc web o la transmissió de virus o programari maliciós.
              </p>

              <h2>6. Modificacions</h2>
              <p>
                OneReserve es reserva el dret de modificar, en qualsevol moment i sense avís previ, la presentació i configuració d'aquest lloc web, així com el present avís legal. Per tant, es recomana a l'usuari que revisi periòdicament aquest text.
              </p>
            </>
          ) : (
            <>
              <h2>1. Identificación del Titular del Sitio Web</h2>
              <p>
                <strong>Nombre de la empresa:</strong> OneReserve<br />
                <strong>Correo electrónico:</strong> admin@onereserve.es<br />
                <strong>Sitio web:</strong> onereserve.es
              </p>

              <h2>2. Objeto</h2>
              <p>
                Este sitio web ha sido creado por OneReserve con la finalidad de proporcionar información sobre nuestros servicios de gestión empresarial y facilitar el contacto con potenciales clientes.
              </p>

              <h2>3. Condiciones de Uso</h2>
              <p>
                Al navegar por este sitio web, el usuario acepta las condiciones de uso establecidas en el presente aviso legal. El usuario deberá abandonar este sitio web si no está de acuerdo con alguna de las condiciones indicadas.
              </p>

              <h2>4. Propiedad Intelectual</h2>
              <p>
                Todos los contenidos de este sitio web, incluyendo textos, imágenes, diseños gráficos, logotipos, iconos, software y cualquier otro material, son propiedad de OneReserve o de sus licenciantes y están protegidos por las leyes de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución, modificación o comunicación pública sin la autorización expresa y por escrito de OneReserve.
              </p>

              <h2>5. Limitación de Responsabilidad</h2>
              <p>
                OneReserve no será responsable de los daños que puedan derivarse del uso de este sitio web, incluyendo los daños causados por errores u omisiones en el contenido, la falta de disponibilidad del sitio web o la transmisión de virus o software malicioso.
              </p>

              <h2>6. Modificaciones</h2>
              <p>
                OneReserve se reserva el derecho de modificar, en cualquier momento y sin previo aviso, la presentación y configuración de este sitio web, así como el presente aviso legal. Por tanto, se recomienda al usuario que revise periódicamente este texto.
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
