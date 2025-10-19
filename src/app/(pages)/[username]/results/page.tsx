'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { Trophy, Home, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedContainer from '@/app/components/AnimatedContainer';
import confetti from 'canvas-confetti';
import { getColorAndMessage } from './utils/percentage';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { Button } from '@/app/components/ui/button';

function Results() {
  const { username } = useParams<{ username: string }>();
  const searchParams = useSearchParams();
  const { push } = useRouter();

  //Agarro el score y el total de url params TODO:Borrar la compuerta OR cuando se agreguen los parametros
  const score = Number.parseInt(searchParams.get('score') || '4');
  const total = Number.parseInt(searchParams.get('total') || '5');
  const percentage = Math.round((score / total) * 100);

  //Set message and color based on percentage
  const result = getColorAndMessage(percentage);

  //Efecto confetti
  useEffect(() => {
    if (percentage < 60) return;

    setTimeout(() => {
      //Si el porcentaje es mayor a 60, tiramos solo un confetti
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });

      //Si el porcentaje es mayor a 80, agregamos dos confettis más
      if (percentage > 80) {
        setTimeout(() => {
          confetti({
            particleCount: 100,
            angle: 60,
            spread: 70,
            origin: { x: 0, y: 0.6 },
          });
        }, 300);

        setTimeout(() => {
          confetti({
            particleCount: 100,
            angle: 120,
            spread: 70,
            origin: { x: 1, y: 0.6 },
          });
        }, 600);
      }
    }, 500);
  }, [percentage]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatedContainer animation="scale" delay={0} duration={0.5} className="w-full max-w-md">
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Resultados del Quiz</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <AnimatedContainer
              animation="scale"
              delay={0.3}
              className="flex flex-col items-center justify-center"
            >
              <motion.div
                animate={{
                  rotateY: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  times: [0, 0.5, 1],
                  repeat: 0,
                }}
              >
                <Trophy className="h-20 w-20 text-amber-500 mb-4" />
              </motion.div>
              <AnimatedContainer
                animation="slideUp"
                delay={0.5}
                className={`text-3xl font-bold ${result.color}`}
              >
                {result.message}
              </AnimatedContainer>
              <AnimatedContainer animation="slideUp" delay={0.7} className="text-xl mt-2">
                Obtuviste <span className="font-bold">{score}</span> de{' '}
                <span className="font-bold">{total}</span>
              </AnimatedContainer>
            </AnimatedContainer>

            <AnimatedContainer animation="slideUp" delay={0.9} className="space-y-2">
              <div className="flex justify-between">
                <span>Tu puntuación</span>
                <span>{percentage}%</span>
              </div>
              <AnimatedContainer animation="fade" delay={1.1} className="w-full">
                <Progress value={percentage} className="h-3 bg-cyan-100" />
              </AnimatedContainer>
            </AnimatedContainer>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button
              className="w-full bg-gradient-to-r from-teal-400 to-cyan-600 hover:from-teal-500 hover:to-cyan-700 transition-all duration-300"
              onClick={() => push(`/${username}/topics`)}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Intentar Otro Quiz
            </Button>
            {/* TODO: Es lo mismo topicos e inicio (Eliminamos boton?) */}
            <Button
              variant="outline"
              className="w-full border-cyan-200 hover:bg-cyan-50 transition-all duration-200"
              onClick={() => push(`/${username}/topics`)}
            >
              <Home className="mr-2 h-4 w-4" />
              Volver al Inicio
            </Button>
          </CardFooter>
        </Card>
      </AnimatedContainer>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando resultados...</div>}>
      <Results />
    </Suspense>
  );
}
