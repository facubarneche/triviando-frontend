'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, X, Loader2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Label } from '@/app/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { topicsMock } from '../../topics/helpers';
import { explicationMock, questionsMock } from './helpers';
import { IQuiz } from './types';

const QuizPage = () => {
  const params = useParams<{ topicId: string }>();
  const { topicId } = params;
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [direction, setDirection] = useState(0);
  const [playHover, setPlayHover] = useState(() => () => {});
  const [playClick, setPlayClick] = useState(() => () => {});
  const [playCorrect, setPlayCorrect] = useState(() => () => {});
  const [playWrong, setPlayWrong] = useState(() => () => {});
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<IQuiz[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const confettiRef = useRef<HTMLDivElement>(null);

  const topic = topicsMock.find((t) => t.id.toString() === topicId)?.name ?? 'General';

  // Load sounds only on client side
  useEffect(() => {
    const loadSounds = async () => {
      try {
        // Importar dinámicamente para evitar errores de SSR
        const { default: useSound } = await import('use-sound');
        // Crear funciones dummy que no hacen nada
        setPlayHover(() => () => {});
        setPlayClick(() => () => {});
        setPlayCorrect(() => () => {
          return useSound;
        });
        setPlayWrong(() => () => {});
      } catch (error) {
        console.error('Failed to load sounds:', error);
      }
    };

    loadSounds();
  }, []);

  // Load questions from AI
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const generatedQuestions = questionsMock(topic);
        setQuestions(generatedQuestions);
        setAnswers(Array(generatedQuestions.length).fill(null));
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [topic]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  const handleOptionSelect = (option: string) => {
    playClick();
    setSelectedOption(option);

    // Update answers array
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);

    // Check if answer is correct
    if (currentQuestion && option === currentQuestion.correctAnswer) {
      setIsCorrect(true);
      playCorrect();

      // Trigger confetti
      if (confettiRef.current) {
        const rect = confettiRef.current.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x, y: y - 0.1 },
        });
      }
    } else {
      setIsCorrect(false);
      playWrong();
    }
  };

  const handleNext = () => {
    playClick();
    if (currentQuestionIndex < questions.length - 1) {
      setDirection(1);
      setIsCorrect(null);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(answers[currentQuestionIndex + 1]);
      }, 300);
    } else {
      setTimeout(() => {
        handleFinish();
      }, 500);
    }
  };

  const handleFinish = () => {
    // Calculate score and redirect to results
    const correctAnswers = answers.filter(
      (answer, index) => answer === questions[index]?.correctAnswer,
    ).length;

    if (correctAnswers >= 3) {
      playCorrect();
    } else {
      playWrong();
    }

    router.push(`/results?score=${correctAnswers}&total=${questions.length}`);
  };

  const handleLearnTogether = async () => {
    if (!currentQuestion) return;

    setIsLoadingExplanation(true);
    setShowExplanation(true);

    try {
      const result = explicationMock(currentQuestion);
      setExplanation(result);
    } catch (error) {
      console.error('Error generating explanation:', error);
    } finally {
      setIsLoadingExplanation(false);
    }
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 flex items-center justify-center p-4">
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm p-8 w-full max-w-md">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 text-cyan-600 animate-spin mb-4" />
            <h2 className="text-xl font-medium">Generando preguntas sobre {topic}...</h2>
            <p className="text-muted-foreground mt-2 text-center">
              Estamos preparando un quiz personalizado para ti. Esto puede tomar unos segundos.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 flex items-center justify-center p-4">
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm p-8 w-full max-w-md">
          <div className="flex flex-col items-center justify-center">
            <X className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-medium">No se pudieron cargar las preguntas</h2>
            <p className="text-muted-foreground mt-2 text-center">
              Hubo un problema al generar el quiz. Por favor, intenta de nuevo.
            </p>
            <Button
              className="mt-6 bg-gradient-to-r from-teal-400 to-cyan-600 hover:from-teal-500 hover:to-cyan-700"
              onClick={() => router.push('/topics')}
            >
              Volver a Temas
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 p-4">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          className="text-white mb-4 hover:bg-white/20"
          onClick={() => {
            playClick();
            router.push('/topics');
          }}
          onMouseEnter={playHover}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Temas
        </Button>

        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm" ref={confettiRef}>
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Pregunta {currentQuestionIndex + 1} de {questions.length}
              </span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-cyan-100" />
          </CardHeader>

          <CardContent className="pt-6 overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentQuestionIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              >
                <CardTitle className="text-xl mb-6">{currentQuestion.question}</CardTitle>

                <RadioGroup value={selectedOption ?? ''} className="space-y-3">
                  {currentQuestion.options.map((option: string, index: number) => (
                    <motion.div
                      key={crypto.randomUUID()}
                      className="flex items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <RadioGroupItem
                        value={option}
                        id={`option-${index}`}
                        onClick={() => handleOptionSelect(option)}
                        className="peer sr-only"
                        disabled={isCorrect !== null}
                      />
                      <Label
                        htmlFor={`option-${index}`}
                        className={`flex flex-1 items-center justify-between rounded-md border-2 border-cyan-100 bg-white p-4 hover:bg-cyan-50 hover:border-cyan-200 peer-data-[state=checked]:border-cyan-500 peer-data-[state=checked]:bg-cyan-50 [&:has([data-state=checked])]:border-cyan-500 transition-all duration-200 ${
                          isCorrect !== null && option === currentQuestion.correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : isCorrect === false && option === selectedOption
                            ? 'border-red-500 bg-red-50'
                            : ''
                        }`}
                        onMouseEnter={playHover}
                      >
                        {option}
                        {isCorrect !== null && option === currentQuestion.correctAnswer && (
                          <CheckCircle2 className="h-5 w-5 text-green-500 ml-2" />
                        )}
                        {isCorrect === false && option === selectedOption && (
                          <X className="h-5 w-5 text-red-500 ml-2" />
                        )}
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>

                {isCorrect === false && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-cyan-200 hover:bg-cyan-50 transition-all duration-200 flex items-center justify-center"
                      onClick={handleLearnTogether}
                      onMouseEnter={playHover}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Aprendamos juntos
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>

          <CardFooter className="flex justify-end">
            {currentQuestionIndex < questions.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!selectedOption}
                className="bg-teal-400 w-full md:w-auto"
                onMouseEnter={playHover}
              >
                Siguiente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleFinish}
                disabled={!selectedOption}
                className="bg-teal-400 w-full md:w-auto"
                onMouseEnter={playHover}
              >
                Finalizar
                <CheckCircle2 className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      <Dialog open={showExplanation} onOpenChange={setShowExplanation}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>Aprendamos juntos</DialogTitle>
            <DialogDescription>Entendiendo la respuesta correcta</DialogDescription>
          </DialogHeader>

          {isLoadingExplanation ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 text-cyan-600 animate-spin mb-4" />
              <p className="text-muted-foreground">Generando explicación...</p>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              <div className="rounded-md bg-cyan-50 p-4 border border-cyan-200">
                <p className="font-medium text-cyan-800">Pregunta:</p>
                <p className="mt-1">{currentQuestion.question}</p>
                <p className="font-medium text-cyan-800 mt-3">Respuesta correcta:</p>
                <p className="mt-1">{currentQuestion.correctAnswer}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Explicación:</h3>
                <div className="prose max-w-none">
                  {explanation.split('\n').map((paragraph) => (
                    <p key={crypto.randomUUID()}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-teal-400 mt-4" onClick={() => setShowExplanation(false)}>
                Entendido
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuizPage;
