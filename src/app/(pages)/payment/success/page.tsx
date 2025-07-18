'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { motion } from 'framer-motion';

import { CheckCircle2, Crown, Sparkles, ArrowRight, Home } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';

function SubscriptionSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { username } = useParams<{ username: string }>();
  const [countdown, setCountdown] = useState(10);

  // Obtener parámetros de la URL (enviados por Mercado Pago)
  const paymentId = searchParams.get('payment_id');
  //   const status = searchParams.get('status');
  const merchantOrderId = searchParams.get('merchant_order_id');

  // Efecto de confetti al cargar
  useEffect(() => {
    const timer = setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#14b8a6', '#06b6d4', '#3b82f6', '#f59e0b'],
      });

      // Múltiples ráfagas
      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 70,
          origin: { x: 0, y: 0.6 },
          colors: ['#14b8a6', '#06b6d4', '#3b82f6', '#f59e0b'],
        });
      }, 300);

      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 70,
          origin: { x: 1, y: 0.6 },
          colors: ['#14b8a6', '#06b6d4', '#3b82f6', '#f59e0b'],
        });
      }, 600);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Contador para redirección automática
  useEffect(() => {
    if (countdown <= 0) {
      router.push(`/${username}/topics`);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router, username]);

  const benefits = [
    'Preguntas ilimitadas generadas por IA',
    'Temas personalizados sin restricciones',
    'Explicaciones detalladas para cada respuesta',
    'Estadísticas avanzadas de progreso',
    'Sin anuncios publicitarios',
    'Soporte prioritario',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 flex items-center justify-center p-4">
      {/* Partículas de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-20">
          {Array.from({ length: 30 }).map((_, i) => (
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
                y: [null, '-20%'],
                x: [null, Math.random() * 10 - 5 + '%'],
              }}
              transition={{
                duration: Math.random() * 15 + 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
              style={{
                width: Math.random() * 40 + 10,
                height: Math.random() * 40 + 10,
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
            {/* Header con icono de éxito */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4"
              >
                <CheckCircle2 className="h-10 w-10" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-bold mb-2"
              >
                ¡Suscripción Activada!
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg opacity-90"
              >
                Bienvenido a trivIAndo Premium
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
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-2 rounded-full mb-4">
                  <Crown className="h-5 w-5 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">Estado Premium Activo</span>
                </div>

                <p className="text-gray-600 mb-6">
                  Tu pago ha sido procesado exitosamente. Ahora tienes acceso completo a todas las
                  funciones premium.
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
                  </div>
                )}
              </motion.div>

              {/* Lista de beneficios */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-8"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-teal-500" />
                  Beneficios Activados
                </h3>

                <div className="grid gap-3">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200"
                    >
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </motion.div>
                  ))}
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
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white h-12"
                  onClick={() => router.push(`/${username}/topics`)}
                >
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Comenzar a Jugar
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 border-emerald-200 hover:bg-emerald-50 h-12 bg-transparent"
                  onClick={() => router.push(`/${username}/profile`)}
                >
                  <Home className="mr-2 h-5 w-5" />
                  Ver Mi Perfil
                </Button>
              </motion.div>

              {/* Contador de redirección */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="text-center mt-6 text-sm text-gray-500"
              >
                Redirección automática en {countdown} segundos
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
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin h-8 w-8 mx-auto mb-4 border-2 border-white border-t-transparent rounded-full" />
        <p>Cargando...</p>
      </div>
    </div>
  );
}

export default function SubscriptionSuccess() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SubscriptionSuccessContent />
    </Suspense>
  );
}
