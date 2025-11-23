import { useLanguage } from '../context/LanguageContext';

export default function AvisoLegal() {
  const { language } = useLanguage();

  return (
    <div className="pt-16 pb-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">1. {language === 'es' ? 'Aviso Legal' : 'Avís Legal'}</h1>
        <p className="text-sm text-gray-700 mb-6">Última actualización: 12 de noviembre de 2025</p>

        <section className="prose max-w-none text-black">
          <h2>{language === 'es' ? 'Titular' : 'Titular'}</h2>
          <p>
            {language === 'es' ? (
              <>En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa que el presente sitio web y la aplicación OneReserve son propiedad de:</>
            ) : (
              <>En compliment de la Llei 34/2002, de Serveis de la Societat de la Informació i de Comerç Electrònic (LSSI-CE), s'informa que el present lloc web i l'aplicació OneReserve són propietat de:</>
            )}
          </p>
          <ul>
            <li>{language === 'es' ? 'Titular: Sergi Puig Márquez (OneReserve)' : 'Titular: Sergi Puig Márquez (OneReserve)'}</li>
            <li>NIF: 41642809K</li>
            <li>{language === 'es' ? 'Domicilio: C/ Rasa 4, 3r 4a' : 'Domicili: C/ Rasa 4, 3r 4a'}</li>
            <li>{language === 'es' ? 'Teléfono: 611 539 641' : 'Telèfon: 611 539 641'}</li>
            <li>{language === 'es' ? 'Correo electrónico: dpo@onereserve.es' : "Correu electrònic: dpo@onereserve.es"}</li>
          </ul>

          <h2>{language === 'es' ? 'Objeto' : 'Objecte'}</h2>
          <p>
            {language === 'es' ? (
              <>OneReserve es una plataforma web destinada a la gestión de reservas y pedidos para negocios. El acceso o uso del sitio implica la aceptación plena de las presentes condiciones.</>
            ) : (
              <>OneReserve és una plataforma web destinada a la gestió de reserves i comandes per a negocis. L'accés o ús del lloc implica l'acceptació plena de les presents condicions.</>
            )}
          </p>

          <h2>{language === 'es' ? 'Condiciones de uso' : "Condicions d'ús"}</h2>
          {language === 'es' ? (
            <>
              <p>El usuario se compromete a hacer un uso adecuado y lícito del sitio web.</p>
              <p>Queda prohibido el uso con fines ilícitos, difamatorios, o que infrinjan derechos de terceros.</p>
              <p>El titular no se hace responsable de los contenidos introducidos por los usuarios o de posibles interrupciones del servicio.</p>
            </>
          ) : (
            <>
              <p>L'usuari es compromet a fer un ús adequat i lícit del lloc web.</p>
              <p>Queda prohibit l'ús amb finalitats il·lícites, difamatòries, o que infringeixin drets de tercers.</p>
              <p>El titular no es fa responsable dels continguts introduïts pels usuaris o de possibles interrupcions del servei.</p>
            </>
          )}

          <h2>{language === 'es' ? 'Propiedad intelectual e industrial' : 'Propietat intel·lectual i industrial'}</h2>
          <p>
            {language === 'es' ? (
              <>Todos los contenidos, logotipos, código fuente y elementos gráficos son propiedad exclusiva de Sergi Puig Márquez (OneReserve). Queda prohibida su reproducción o distribución sin autorización expresa.</>
            ) : (
              <>Tots els continguts, logotips, codi font i elements gràfics són propietat exclusiva de Sergi Puig Márquez (OneReserve). Queda prohibida la seva reproducció o distribució sense autorització expressa.</>
            )}
          </p>

          <h2>{language === 'es' ? 'Responsabilidad' : 'Responsabilitat'}</h2>
          <p>
            {language === 'es' ? (
              <>OneReserve no se responsabiliza de los daños derivados del mal uso del sitio, fallos técnicos o pérdida de datos. Los negocios que usan la aplicación son responsables de los datos personales que gestionan de sus propios clientes.</>
            ) : (
              <>OneReserve no es responsabilitza dels danys derivats del mal ús del lloc, fallades tècniques o pèrdua de dades. Els negocis que fan servir l'aplicació són responsables de les dades personals que gestionen dels seus propis clients.</>
            )}
          </p>

          <h2>{language === 'es' ? 'Legislación y jurisdicción' : 'Legislació i jurisdicció'}</h2>
          <p>
            {language === 'es' ? (
              <>Las relaciones entre OneReserve y los usuarios se regirán por la legislación española, sometiéndose las partes a los Juzgados y Tribunales de Barcelona (España).</>
            ) : (
              <>Les relacions entre OneReserve i els usuaris es regiran per la legislació espanyola, sotmetent-se les parts als Jutjats i Tribunals de Barcelona (Espanya).</>
            )}
          </p>
        </section>
      </div>
    </div>
  );
}
