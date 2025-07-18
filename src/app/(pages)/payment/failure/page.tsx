'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { motion } from 'framer-motion';

import {
  XCircle,
  AlertTriangle,
  RefreshCw,
  ArrowLeft,
  Home,
  CreditCard,
  HelpCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';

function SubscriptionFailureContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { username } = useParams<{ username: string }>();
  const [isRetrying, setIsRetrying] = useState(false);

  // Obtener parámetros de la URL
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  const statusDetail = searchParams.get('status_detail');
  const merchantOrderId = searchParams.get('merchant_order_id');

  // Función para reintentar el pago
  const retryPayment = async () => {
    setIsRetrying(true);

    try {
      // Simular redirección a nueva sesión de pago
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // En una app real, aquí crearías una nueva preferencia de pago
      // router.push("/subscription/checkout")

      console.log('Redirecting to new payment session...');
    } catch (error) {
      console.error('Error retrying payment:', error);
    } finally {
      setIsRetrying(false);
    }
  };

  // Obtener mensaje de error basado en el status_detail
  const getErrorMessage = (detail: string | null) => {
    const errorMessages: { [key: string]: string } = {
      cc_rejected_insufficient_amount: 'Fondos insuficientes en tu tarjeta',
      cc_rejected_bad_filled_card_number: 'Número de tarjeta incorrecto',
      cc_rejected_bad_filled_date: 'Fecha de vencimiento incorrecta',
      cc_rejected_bad_filled_security_code: 'Código de seguridad incorrecto',
      cc_rejected_call_for_authorize: 'Debes autorizar el pago con tu banco',
      cc_rejected_card_disabled: 'Tu tarjeta está deshabilitada',
      cc_rejected_duplicated_payment: 'Ya existe un pago con estos datos',
      cc_rejected_high_risk: 'Pago rechazado por seguridad',
      cc_rejected_max_attempts: 'Superaste el límite de intentos',
      cc_rejected_other_reason: 'Tu tarjeta rechazó el pago',
    };

    return detail
      ? errorMessages[detail] || 'Error en el procesamiento del pago'
      : 'Error desconocido';
  };

  const commonSolutions = [
    {
      icon: CreditCard,
      title: 'Verifica tu información',
      description: 'Asegúrate de que los datos de tu tarjeta sean correctos',
    },
    {
      icon: AlertTriangle,
      title: 'Revisa tu saldo',
      description: 'Confirma que tengas fondos suficientes disponibles',
    },
    {
      icon: HelpCircle,
      title: 'Contacta tu banco',
      description: 'Tu banco podría estar bloqueando la transacción',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-rose-600 flex items-center justify-center p-4">
      {/* Partículas de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/30"
              initial={{
                opacity: Math.random() * 0.5 + 0.3,
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [null, '-10%'],
                x: [null, Math.random() * 6 - 3 + '%'],
              }}
              transition={{
                duration: Math.random() * 25 + 30,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
              style={{
                width: Math.random() * 30 + 8,
                height: Math.random() * 30 + 8,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl z-10"
      >
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-pink-600 p-8 text-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4"
              >
                <XCircle className="h-10 w-10" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-bold mb-2"
              >
                Pago No Procesado
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg opacity-90"
              >
                Hubo un problema con tu suscripción
              </motion.p>
            </div>

            {/* Contenido principal */}
            <div className="p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-pink-100 px-4 py-2 rounded-full mb-4">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="text-red-700 font-medium">Pago Rechazado</span>
                </div>

                <p className="text-gray-600 mb-6">{getErrorMessage(statusDetail)}</p>

                {/* Información del pago fallido */}
                {paymentId && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">ID de Pago:</span> {paymentId}
                    </p>
                    {merchantOrderId && (
                      <p className="text-gray-600">
                        <span className="font-medium">Orden:</span> {merchantOrderId}
                      </p>
                    )}
                    <p className="text-gray-600">
                      <span className="font-medium">Estado:</span> {status || 'rejected'}
                    </p>
                    {statusDetail && (
                      <p className="text-gray-600">
                        <span className="font-medium">Detalle:</span> {statusDetail}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>

              {/* Soluciones comunes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-8"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
                  Posibles Soluciones
                </h3>

                <div className="grid gap-4">
                  {commonSolutions.map((solution, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <solution.icon className="h-5 w-5 text-white" />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-medium text-blue-800 mb-1">{solution.title}</h4>
                        <p className="text-sm text-blue-700">{solution.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Información de ayuda */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-1">¿Necesitas ayuda?</h4>
                    <p className="text-sm text-yellow-700">
                      Si el problema persiste, puedes intentar con otro método de pago o contactar a
                      nuestro soporte técnico. También puedes revisar el estado de tu cuenta en
                      Mercado Pago.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Botones de acción */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white h-12"
                  onClick={retryPayment}
                  disabled={isRetrying}
                >
                  {isRetrying ? (
                    <>
                      <motion.div
                        className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: 'linear',
                        }}
                      />
                      Reintentando...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-5 w-5" />
                      Intentar de Nuevo
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 border-red-200 hover:bg-red-50 h-12 bg-transparent"
                  onClick={() => router.push(`/${username}/topics`)}
                >
                  <Home className="mr-2 h-5 w-5" />
                  Volver al Inicio
                </Button>
              </motion.div>

              {/* Enlaces adicionales */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="flex flex-col sm:flex-row gap-4 mt-6 text-center"
              >
                <Button
                  variant="ghost"
                  className="flex-1 text-gray-500 hover:text-gray-700"
                  onClick={() => router.push(`/${username}/subscription`)}
                >
                  Ver Planes de Suscripción
                </Button>

                <Button
                  variant="ghost"
                  className="flex-1 text-gray-500 hover:text-gray-700"
                  onClick={() => router.push(`/${username}/support`)}
                >
                  Contactar Soporte
                </Button>
              </motion.div>

              {/* Link para volver */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="text-center mt-4"
              >
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver atrás
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-red-500 to-red-600 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin h-8 w-8 mx-auto mb-4 border-2 border-white border-t-transparent rounded-full" />
        <p>Cargando...</p>
      </div>
    </div>
  );
}

export default function SubscriptionFailure() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SubscriptionFailureContent />
    </Suspense>
  );
}
