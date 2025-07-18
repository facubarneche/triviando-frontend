'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import {
  Crown,
  Check,
  Sparkles,
  Brain,
  Zap,
  Shield,
  ArrowLeft,
  CreditCard,
  Loader2,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { useUserStore } from '@/app/stores/userStore';
import { suscriptionService } from '@/app/services/suscriptionService';
import { userService } from '@/app/services/userService';
import type { IUserData } from '@/app/services/userService';

export default function Subscription() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<IUserData | null>(null);
  const { user } = useUserStore();

  // Cargar los datos completos del usuario al montar el componente
  useEffect(() => {
    const loadUserDetails = async () => {
      if (user?.id) {
        try {
          const userData = await userService.getUserById(user.id);
          setUserDetails(userData);
        } catch (error) {
          console.error('Error al cargar datos del usuario:', error);
          setError('Error al cargar los datos del usuario.');
        }
      }
    };

    loadUserDetails();
  }, [user?.id]);

  // Si no hay usuario cargado, mostrar un mensaje o redirigir
  if (!user || !userDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 flex items-center justify-center">
        <div className="text-center text-white">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Cargando información del usuario...</p>
        </div>
      </div>
    );
  }

  // Características del plan premium
  const premiumFeatures = [
    {
      icon: Brain,
      title: 'Preguntas Ilimitadas con IA',
      description: 'Genera tantas preguntas como quieras sobre cualquier tema',
    },
    {
      icon: Sparkles,
      title: 'Temas Personalizados',
      description: 'Crea temas únicos y específicos para tus intereses',
    },
    {
      icon: Zap,
      title: 'Explicaciones Detalladas',
      description: 'Aprende con explicaciones generadas por IA para cada respuesta',
    },
    {
      icon: Shield,
      title: 'Sin Anuncios',
      description: 'Disfruta de una experiencia completamente libre de publicidad',
    },
  ];

  // Datos para la tabla de comparación
  const comparisonFeatures = [
    {
      feature: 'Preguntas por día',
      free: '10',
      premium: 'Ilimitadas',
    },
    {
      feature: 'Temas personalizados',
      free: '1',
      premium: 'Ilimitados',
    },
    {
      feature: 'Explicaciones IA',
      free: false,
      premium: true,
    },
    {
      feature: 'Sin anuncios',
      free: false,
      premium: true,
    },
    {
      feature: 'Estadísticas avanzadas',
      free: false,
      premium: true,
    },
    {
      feature: 'Soporte prioritario',
      free: false,
      premium: true,
    },
  ];

  const handleSubscribe = async () => {
    if (!user?.id || !userDetails?.email) {
      setError('No se encontró información del usuario. Por favor, inicia sesión nuevamente.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Iniciando proceso de suscripción para:', userDetails.email);
      // Usar el subscription service con el email de userDetails
      const data = await suscriptionService.getCheckoutUrlForSubscription({
        email: userDetails.email,
      });

      // Verificar que recibimos la URL de Mercado Pago
      if (!data.url && !data.checkout_url && !data.init_point) {
        throw new Error('No se recibió la URL de pago de Mercado Pago');
      }

      // Obtener la URL (puede venir en diferentes campos según la respuesta)
      const checkoutUrl = data.url || data.checkout_url || data.init_point;

      // Abrir Mercado Pago en una nueva ventana/popup
      const popup = window.open(
        checkoutUrl,
        'mercadopago-checkout',
        'width=800,height=600,scrollbars=yes,resizable=yes,status=yes,location=yes,toolbar=no,menubar=no',
      );

      if (!popup) {
        // Si el popup fue bloqueado, redirigir en la misma ventana
        window.location.href = checkoutUrl;
        return;
      }

      // Monitorear el popup para detectar cuando se cierre
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          setIsLoading(false);

          // Opcional: verificar el estado de la suscripción
          // En una app real, podrías hacer una llamada para verificar si el pago fue exitoso
          console.log('Popup de Mercado Pago cerrado');
        }
      }, 1000);

      // Limpiar el intervalo después de 10 minutos por seguridad
      setTimeout(() => {
        clearInterval(checkClosed);
        setIsLoading(false);
      }, 600000); // 10 minutos
    } catch (err) {
      console.error('Error al procesar suscripción:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido al procesar la suscripción');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600">
      <header className="p-4">
        <Link
          href="/topics"
          className="inline-flex items-center text-white hover:text-white/80 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Temas
        </Link>
      </header>

      <main className="p-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6"
          >
            <Crown className="h-6 w-6 text-yellow-300" />
            <span className="text-white font-semibold text-lg">trivIAndo Premium</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Desbloquea Todo el Potencial
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            Accede a preguntas ilimitadas generadas por IA, temas personalizados y una experiencia
            sin anuncios
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Características Premium */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">¿Qué incluye Premium?</h2>

            {premiumFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
              >
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-white/80">{feature.description}</p>
                </div>
              </motion.div>
            ))}

            {/* Tabla de comparación mejorada */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-white/95 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20"
            >
              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-4">
                <h3 className="text-lg font-semibold text-white text-center">
                  Comparación de Planes
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-4 font-medium text-gray-700">Característica</th>
                      <th className="text-center p-4 font-medium text-gray-600">Gratis</th>
                      <th className="text-center p-4 font-medium text-teal-600 bg-teal-50">
                        Premium
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="p-4 text-gray-700 font-medium">{item.feature}</td>
                        <td className="p-4 text-center">
                          {typeof item.free === 'boolean' ? (
                            item.free ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-gray-400 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-600">{item.free}</span>
                          )}
                        </td>
                        <td className="p-4 text-center bg-teal-50/50">
                          {typeof item.premium === 'boolean' ? (
                            item.premium ? (
                              <Check className="h-5 w-5 text-teal-600 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-gray-400 mx-auto" />
                            )
                          ) : (
                            <span className="text-teal-600 font-semibold">{item.premium}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>

          {/* Tarjeta de Suscripción */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 mx-auto">
                  <Crown className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl mb-2">Plan Premium</CardTitle>
                <div className="text-4xl font-bold mb-2">
                  $9.99
                  <span className="text-lg font-normal opacity-90">/mes</span>
                </div>
                <p className="opacity-90">Facturación mensual</p>
              </CardHeader>

              <CardContent className="p-8">
                {/* Lista de beneficios */}
                <div className="space-y-4 mb-8">
                  {[
                    'Preguntas ilimitadas con IA',
                    'Temas personalizados sin límite',
                    'Explicaciones detalladas',
                    'Estadísticas avanzadas',
                    'Sin anuncios publicitarios',
                    'Soporte prioritario',
                    'Nuevas funciones primero',
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <Check className="h-5 w-5 text-teal-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Información del usuario */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-1">Suscripción para:</p>
                  <p className="font-medium text-gray-800">
                    {userDetails?.name && userDetails?.lastName
                      ? `${userDetails.name} ${userDetails.lastName}`
                      : user?.username || 'Usuario'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {userDetails?.email || 'Email no disponible'}
                  </p>
                </div>

                {/* Mensaje de error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
                  >
                    <p className="text-red-700 text-sm">{error}</p>
                  </motion.div>
                )}

                {/* Botón de suscripción */}
                <Button
                  className="w-full h-14 text-lg bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white shadow-lg"
                  onClick={handleSubscribe}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" />
                      Suscribirse Ahora
                    </>
                  )}
                </Button>

                {/* Información adicional */}
                <div className="mt-6 text-center space-y-2">
                  <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                    <Shield className="h-4 w-4" />
                    Pago seguro con Mercado Pago
                  </p>
                  <p className="text-xs text-gray-500">
                    Puedes cancelar tu suscripción en cualquier momento
                  </p>
                  <p className="text-xs text-gray-500">
                    Al suscribirte aceptas nuestros términos y condiciones
                  </p>
                </div>

                {/* Garantía */}
                <div className="mt-6 bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="h-5 w-5 text-teal-600" />
                    <span className="font-medium text-teal-800">Garantía de 7 días</span>
                  </div>
                  <p className="text-sm text-teal-700">
                    Si no estás satisfecho, te devolvemos tu dinero sin preguntas
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Testimonios o información adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">¿Por qué elegir Premium?</h3>
            <p className="text-white/90 text-lg max-w-3xl mx-auto">
              Únete a miles de usuarios que ya disfrutan de una experiencia de aprendizaje
              personalizada y sin límites. Con trivIAndo Premium, cada pregunta es una oportunidad
              de aprender algo nuevo.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
