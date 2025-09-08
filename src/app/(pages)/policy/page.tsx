'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';


export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600">
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
            <CardTitle className="text-3xl text-center">Política de Privacidad</CardTitle>
            <p className="text-center text-white/90 mt-2">Última actualización: Julio 2025</p>
          </CardHeader>

          <CardContent className="p-8 prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              1. Información que Recopilamos
            </h2>
            <p className="text-gray-700 mb-4">Recopilamos los siguientes tipos de información:</p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Información Personal</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Nombre completo y nombre de usuario</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono (opcional)</li>
              <li>Fecha de nacimiento</li>
              <li>Información de pago (procesada por Mercado Pago)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Información de Uso</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Historial de preguntas y respuestas</li>
              <li>Puntuaciones y estadísticas de juego</li>
              <li>Temas de interés y preferencias</li>
              <li>Tiempo de uso de la aplicación</li>
              <li>Dispositivo y navegador utilizado</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              2. Cómo Utilizamos su Información
            </h2>
            <p className="text-gray-700 mb-4">Utilizamos la información recopilada para:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Proporcionar y mejorar nuestros servicios</li>
              <li>Personalizar su experiencia de aprendizaje</li>
              <li>Generar preguntas relevantes usando IA</li>
              <li>Procesar pagos y gestionar suscripciones</li>
              <li>Enviar notificaciones importantes sobre el servicio</li>
              <li>Analizar el uso para mejorar la aplicación</li>
              <li>Prevenir fraudes y garantizar la seguridad</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Compartir Información</h2>
            <p className="text-gray-700 mb-4">
              No vendemos, alquilamos ni compartimos su información personal con terceros, excepto
              en las siguientes circunstancias:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Con su consentimiento explícito</li>
              <li>Para procesar pagos (Mercado Pago)</li>
              <li>Para cumplir con obligaciones legales</li>
              <li>Para proteger nuestros derechos y seguridad</li>
              <li>Con proveedores de servicios que nos ayudan a operar la aplicación</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Seguridad de los Datos</h2>
            <p className="text-gray-700 mb-6">
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger
              su información personal contra acceso no autorizado, alteración, divulgación o
              destrucción. Esto incluye encriptación de datos, acceso restringido y monitoreo
              regular de nuestros sistemas.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Retención de Datos</h2>
            <p className="text-gray-700 mb-6">
              Conservamos su información personal durante el tiempo necesario para cumplir con los
              propósitos descritos en esta política, a menos que la ley requiera o permita un
              período de retención más largo. Cuando elimine su cuenta, eliminaremos su información
              personal, excepto cuando sea necesario conservarla por razones legales.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Sus Derechos</h2>
            <p className="text-gray-700 mb-4">Usted tiene derecho a:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Acceder a su información personal</li>
              <li>Corregir información inexacta</li>
              <li>Solicitar la eliminación de su información</li>
              <li>Oponerse al procesamiento de su información</li>
              <li>Solicitar la portabilidad de sus datos</li>
              <li>Retirar su consentimiento en cualquier momento</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              7. Cookies y Tecnologías Similares
            </h2>
            <p className="text-gray-700 mb-6">
              Utilizamos cookies y tecnologías similares para mejorar su experiencia, analizar el
              uso de la aplicación y personalizar el contenido. Puede controlar las cookies a través
              de la configuración de su navegador, aunque esto puede afectar la funcionalidad de la
              aplicación.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Menores de Edad</h2>
            <p className="text-gray-700 mb-6">
              Nuestra aplicación está dirigida a usuarios mayores de 13 años. No recopilamos
              intencionalmente información personal de menores de 13 años. Si descubrimos que hemos
              recopilado información de un menor de 13 años, la eliminaremos inmediatamente.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Cambios en esta Política</h2>
            <p className="text-gray-700 mb-6">
              Podemos actualizar esta Política de Privacidad ocasionalmente. Le notificaremos sobre
              cambios significativos publicando la nueva política en la aplicación y actualizando la
              fecha de `última actualización`. Su uso continuado de la aplicación después de dichos
              cambios constituye su aceptación de la nueva política.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Contacto</h2>
            <p className="text-gray-700 mb-6">
              Si tiene preguntas sobre esta Política de Privacidad o desea ejercer sus derechos,
              puede contactarnos en:
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
