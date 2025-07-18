'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, RefreshCw, AlertCircle, ArrowLeft, Home, CreditCard } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';

function SubscriptionPendingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { username } = useParams<{ username: string }>();
  const [isChecking, setIsChecking] = useState(false);

  // Obtener parámetros de la URL
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  const merchantOrderId = searchParams.get('merchant_order_id');

  // Simular verificación de estado del pago
  const checkPaymentStatus = async () => {
    setIsChecking(true);

    // Simular llamada a API para verificar estado
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // En una app real, aquí verificarías el estado real del pago
      // const response = await fetch(`/api/payments/${paymentId}/status`)
      // const data = await response.json()

      console.log('Checking payment status...');
      // Por ahora solo simulamos que sigue pendiente
    } catch (error) {
      console.error('Error checking payment status:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const steps = [
    {
      title: 'Pago Iniciado',
      description: 'Tu solicitud de suscripción ha sido recibida',
      completed: true,
    },
    {
      title: 'Procesando Pago',
      description: 'Estamos verificando tu método de pago',
      completed: false,
      current: true,
    },
    {
      title: 'Activación',
      description: 'Activaremos tu suscripción premium',
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-600 flex items-center justify-center p-4">
      {/* Partículas de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-20">
          {Array.from({ length: 25 }).map((_, i) => (
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
                y: [null, '-15%'],
                x: [null, Math.random() * 8 - 4 + '%'],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 20 + 25,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
              style={{
                width: Math.random() * 35 + 8,
                height: Math.random() * 35 + 8,
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
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                >
                  <Clock className="h-10 w-10" />
                </motion.div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-bold mb-2"
              >
                Pago en Proceso
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg opacity-90"
              >
                Estamos procesando tu suscripción
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
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-full mb-4">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <span className="text-amber-700 font-medium">Procesando Pago</span>
                </div>

                <p className="text-gray-600 mb-6">
                  Tu pago está siendo verificado por Mercado Pago. Este proceso puede tomar unos
                  minutos.
                </p>

                {/* Información del pago */}
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
                      <span className="font-medium">Estado:</span> {status || 'pending'}
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Pasos del proceso */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-8"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
                  Progreso del Proceso
                </h3>

                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                        step.completed
                          ? 'bg-green-50 border-green-200'
                          : step.current
                          ? 'bg-amber-50 border-amber-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed
                            ? 'bg-green-500 text-white'
                            : step.current
                            ? 'bg-amber-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        {step.completed ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                          >
                            ✓
                          </motion.div>
                        ) : step.current ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: 'linear',
                            }}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </motion.div>
                        ) : (
                          index + 1
                        )}
                      </div>

                      <div className="flex-1">
                        <h4
                          className={`font-medium ${
                            step.completed
                              ? 'text-green-700'
                              : step.current
                              ? 'text-amber-700'
                              : 'text-gray-600'
                          }`}
                        >
                          {step.title}
                        </h4>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Información adicional */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8"
              >
                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-800 mb-1">¿Qué está pasando?</h4>
                    <p className="text-sm text-blue-700">
                      Dependiendo de tu método de pago, la verificación puede tomar desde unos
                      minutos hasta 24 horas. Recibirás una notificación por email cuando el pago
                      sea confirmado.
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
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white h-12"
                  onClick={checkPaymentStatus}
                  disabled={isChecking}
                >
                  {isChecking ? (
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
                      Verificando...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-5 w-5" />
                      Verificar Estado
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 border-amber-200 hover:bg-amber-50 h-12 bg-transparent"
                  onClick={() => router.push(`/${username}/topics`)}
                >
                  <Home className="mr-2 h-5 w-5" />
                  Volver al Inicio
                </Button>
              </motion.div>

              {/* Link para volver */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="text-center mt-6"
              >
                <Button
                  variant="ghost"
                  className="text-gray-500 hover:text-gray-700"
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin h-8 w-8 mx-auto mb-4 border-2 border-white border-t-transparent rounded-full" />
        <p>Cargando...</p>
      </div>
    </div>
  );
}

export default function SubscriptionPending() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SubscriptionPendingContent />
    </Suspense>
  );
}
