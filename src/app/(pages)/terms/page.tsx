'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <header className="p-4">
        <Link
          href="/register"
          className="inline-flex items-center text-white hover:text-white/80 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Registro
        </Link>
      </header>

      <main className="p-4 max-w-4xl mx-auto pb-8">
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
            <CardTitle className="text-3xl text-center">Términos de Uso</CardTitle>
            <p className="text-center text-white/90 mt-2">Última actualización: Julio 2025</p>
          </CardHeader>

          <CardContent className="p-8 prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Aceptación de los Términos</h2>
            <p className="text-gray-700 mb-6">
              Al acceder y utilizar trivIAndo, usted acepta estar sujeto a estos Términos de Uso y
              todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos
              términos, no debe utilizar esta aplicación.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Descripción del Servicio</h2>
            <p className="text-gray-700 mb-6">
              trivIAndo es una plataforma de trivia educativa que utiliza inteligencia artificial
              para generar preguntas personalizadas. Ofrecemos tanto servicios gratuitos como
              premium para mejorar la experiencia de aprendizaje.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Registro de Cuenta</h2>
            <p className="text-gray-700 mb-4">
              Para utilizar ciertas funciones de la aplicación, debe:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Proporcionar información precisa y completa durante el registro</li>
              <li>Mantener la seguridad de su contraseña</li>
              <li>Notificar inmediatamente cualquier uso no autorizado de su cuenta</li>
              <li>Ser responsable de todas las actividades que ocurran bajo su cuenta</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Uso Aceptable</h2>
            <p className="text-gray-700 mb-4">Usted se compromete a no:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Utilizar la aplicación para fines ilegales o no autorizados</li>
              <li>Intentar obtener acceso no autorizado a otros sistemas o redes</li>
              <li>Interferir con el funcionamiento normal de la aplicación</li>
              <li>Transmitir contenido ofensivo, difamatorio o inapropiado</li>
              <li>Violar los derechos de propiedad intelectual de terceros</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Suscripciones Premium</h2>
            <p className="text-gray-700 mb-4">
              Las suscripciones premium están sujetas a los siguientes términos:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Los pagos se procesan mensualmente de forma automática</li>
              <li>Puede cancelar su suscripción en cualquier momento</li>
              <li>No se proporcionan reembolsos por períodos parciales</li>
              <li>Los precios pueden cambiar con previo aviso de 30 días</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Propiedad Intelectual</h2>
            <p className="text-gray-700 mb-6">
              Todo el contenido de la aplicación, incluyendo pero no limitado a texto, gráficos,
              logotipos, iconos, imágenes, clips de audio, descargas digitales y software, es
              propiedad de trivIAndo y está protegido por las leyes de derechos de autor
              internacionales.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              7. Limitación de Responsabilidad
            </h2>
            <p className="text-gray-700 mb-6">
              trivIAndo no será responsable por daños indirectos, incidentales, especiales,
              consecuentes o punitivos, incluyendo pero no limitado a pérdida de beneficios, datos,
              uso, buena voluntad u otras pérdidas intangibles.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Modificaciones</h2>
            <p className="text-gray-700 mb-6">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Las
              modificaciones entrarán en vigor inmediatamente después de su publicación en la
              aplicación. Su uso continuado de la aplicación constituye su aceptación de los
              términos modificados.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Terminación</h2>
            <p className="text-gray-700 mb-6">
              Podemos terminar o suspender su cuenta inmediatamente, sin previo aviso o
              responsabilidad, por cualquier motivo, incluyendo sin limitación si usted incumple los
              Términos de Uso.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Contacto</h2>
            <p className="text-gray-700 mb-6">
              Si tiene preguntas sobre estos Términos de Uso, puede contactarnos en:
              <br />
              Email: triviando@gmail.com
              <br />
              Dirección: Buenos Aires, Argentina
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
