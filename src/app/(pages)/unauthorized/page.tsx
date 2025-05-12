'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import { Home, ArrowLeft, RefreshCw, Lock } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';

export default function Unauthorized() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown <= 0) {
      router.push('/');
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  const shieldVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
      },
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'reverse' as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 flex items-center justify-center p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm p-8 text-center">
          <div className="flex flex-col items-center">
            <motion.div
              className="relative mb-6"
              initial="initial"
              animate={['animate', 'pulse']}
              variants={shieldVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full blur-xl opacity-30 scale-110"></div>
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 flex items-center justify-center">
                <Lock className="h-10 w-10 text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-cyan-700 mb-2"
            >
              Acceso Restringido
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground mb-6"
            >
              No tienes permisos para acceder a esta página o la ruta no existe.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-3 w-full"
            >
              <Button
                className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white"
                onClick={() => router.push('/')}
              >
                <Home className="mr-2 h-4 w-4" />
                Volver al Inicio
              </Button>

              <Button
                variant="outline"
                className="w-full border-cyan-200 hover:bg-cyan-50"
                onClick={() => router.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver Atrás
              </Button>

              <div className="pt-4 text-sm text-muted-foreground">
                <RefreshCw className="inline-block h-3 w-3 mr-1 animate-spin" />
                Redirección automática en{' '}
                <span className="font-medium text-cyan-600">{countdown}</span> segundos
              </div>
            </motion.div>
          </div>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-center text-white/80 text-sm"
        >
          <p>
            ¿Necesitas ayuda?{' '}
            <Link href="/contact" className="underline hover:text-white">
              Contacta con soporte
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
