'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Label } from '@/app/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { explicationBackUp, parserQuiz, variants } from './helpers';
import WaitingModal from './components/WaitingModal';
import ProblemModal from './components/ProblemModal';
import LearnTogether from './components/LearnTogether';
import { quizService } from '@/app/services/quizService';
import { IFeedbackDTO, IQuiz, LetterType } from './types';
import { getUserIdCSR } from '@/app/utils/getUserIdCSR';
import Timer, { TimerHandle } from '../../../../components/Timer';
import { playSound } from '@/app/utils/playSound';
import QuestionFeedback from './components/QuestionFeedback';
import { toast } from 'react-toastify';

const QuizPage = () => {
  const { topic, username } = useParams<{ username: string; topic: string }>();
  const decodeURITopic = decodeURIComponent(topic);
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<IQuiz[]>([]);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctOption, setCorrectOption] = useState<{ text: string; letter: LetterType }>({
    text: '',
    letter: 'A',
  });
  const [explanation, setExplanation] = useState('');
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [currentQuestionFeedback, setCurrentQuestionFeedback] = useState<{
    type: string;
    description?: string;
  } | null>(null);
  const confettiRef = useRef<HTMLDivElement>(null);
  const userId = getUserIdCSR();
  const timerRef = useRef<TimerHandle>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const quiz = await quizService.getQuiz(decodeURITopic);
        const parsedQuiz = parserQuiz(quiz);
        setQuestions(parsedQuiz);
        setAnswers(Array(parsedQuiz.length).fill(null));
      } catch {
        // Error fetching questions, continue with empty array
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          //TODO: Ver si al refactorizar se puede eliminar el setTimeout
          timerRef.current?.start();
        }, 200);
      }
    };

    fetchQuestions();
  }, [decodeURITopic]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  const handleOptionSelect = async (quizId: string, option: LetterType) => {
    timerRef.current?.stop();
    const millisecondsSpent = timerRef.current?.getElapsedTime() || 0;
    const { score, correctOption } = await quizService.getQuizAnswer({
      questionId: quizId,
      user: { id: userId },
      optionSelected: option,
      millisecondsSpent,
    });
    setSelectedOption(option);
    setCorrectOption({ text: correctOption.text, letter: correctOption.letter });

    // Update answers array
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);

    if (currentQuestion && correctOption.letter === option) {
      setIsCorrect(true);

      if (score) {
        setScore((prev) => prev + 1);
        playSound('/sounds/correct.mp3');

        // Trigger confetti
        if (confettiRef.current) {
          const rect = confettiRef.current.getBoundingClientRect();
          const x = (rect.left + rect.width / 2) / window.innerWidth;
          const y = (rect.top + rect.height / 2) / window.innerHeight;

          return confetti({
            particleCount: 100,
            spread: 70,
            origin: { x, y: y - 0.1 },
          });
        }
      }
    }
    setIsCorrect(false);
    playSound('/sounds/incorrect.mp3');
  };

  const handleNext = async () => {
    // Enviar feedback de la pregunta actual antes de avanzar
    if (currentQuestionFeedback) {
      try {
        await handleFeedbackSubmit(
          currentQuestionFeedback.type,
          currentQuestionFeedback.description,
        );
        toast.success('Gracias por tu feedback');
      } catch {
        toast.error('Error al enviar el feedback. Por favor, inténtalo de nuevo más tarde.');
        // Continuar aunque falle el envío del feedback
      }
    }

    if (currentQuestionIndex < questions.length - 1) {
      timerRef.current?.start();
      setDirection(1);
      setIsCorrect(null);
      setCurrentQuestionFeedback(null); // Limpiar feedback para la siguiente pregunta
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      }, 300);
    } else {
      const finishQuiz = async () => {
        await handleFinish();
      };
      setTimeout(() => {
        finishQuiz();
      }, 500);
    }
  };

  const handleFinish = async () => {
    // Enviar feedback de la pregunta actual antes de finalizar
    if (currentQuestionFeedback) {
      try {
        await handleFeedbackSubmit(
          currentQuestionFeedback.type,
          currentQuestionFeedback.description,
        );
        toast.success('Gracias por tu feedback');
      } catch {
        toast.error('Error al enviar el feedback. Por favor, inténtalo de nuevo más tarde.');
        // Continuar aunque falle el envío del feedback
      }
    }

    quizService.generateQuiz(decodeURITopic);
    router.push(`/${username}/results?score=${score}&total=${questions.length}`);
  };

  const handleLearnTogether = async () => {
    if (!currentQuestion) return;

    setIsLoadingExplanation(true);
    setShowExplanation(true);

    try {
      const result = currentQuestion.explanation || explicationBackUp;
      setExplanation(result);
    } catch {
      // Error generating explanation, use backup
    } finally {
      setIsLoadingExplanation(false);
    }
  };

  const handleFeedbackSelect = (feedbackType: string, description?: string) => {
    // Solo almacenar el feedback, no enviarlo todavía
    if (feedbackType === 'none') {
      setCurrentQuestionFeedback(null);
    } else {
      setCurrentQuestionFeedback({
        type: feedbackType,
        description,
      });
    }
  };

  const handleFeedbackSubmit = async (feedbackType: string, description?: string) => {
    try {
      const feedbackData: IFeedbackDTO = {
        questionId: currentQuestion.id,
        feedbackType,
        ...(description && { description }),
      };
      await quizService.sendFeedback(feedbackData);
    } catch {
      throw new Error('Failed to send feedback');
    }
  };

  const getAnswerStyles = (isCorrect: boolean | null, option: string) => {
    if (isCorrect === null) return;
    if (isCorrect && option === selectedOption) return 'border-green-500 bg-green-100';
    if (!isCorrect && option === selectedOption) return 'border-red-500 bg-red-100';
  };

  if (isLoading) return <WaitingModal topic={name ?? 'General'} />;

  if (!currentQuestion) return <ProblemModal />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 p-4">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          className="text-white mb-4 hover:bg-white/20 cursor-pointer"
          onClick={() => {
            router.push(`/${username}/topics`);
          }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Temas
        </Button>

        <Card
          className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm cursor-default"
          ref={confettiRef}
        >
          <CardHeader>
            <Timer ref={timerRef} />
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
                  {currentQuestion.options.map(({ text, letter }, index: number) => (
                    <motion.div
                      key={`${currentQuestionIndex}-${letter}`}
                      className="flex items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 * 0.1 }}
                    >
                      <RadioGroupItem
                        value={letter}
                        id={`option-${index}`}
                        onClick={() => handleOptionSelect(currentQuestion.id, letter)}
                        className="peer sr-only"
                        disabled={isCorrect !== null}
                      />
                      <Label
                        htmlFor={`option-${index}`}
                        className={`flex flex-1 items-center justify-between rounded-md border-2 border-cyan-100 bg-white p-4 transition-all duration-200 cursor-pointer ${getAnswerStyles(
                          isCorrect,
                          letter,
                        )}`}
                      >
                        {text}
                        {isCorrect && letter === selectedOption && (
                          <CheckCircle2 className="h-5 w-5 text-green-500 ml-2" />
                        )}
                        {isCorrect === false && letter === selectedOption && (
                          <X className="h-5 w-5 text-red-500 ml-2" />
                        )}
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>

                {/* Botones que aparecen después de responder */}
                {isCorrect !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 flex flex-col gap-3"
                  >
                    {/* Botón Aprendamos juntos - solo para respuestas incorrectas */}
                    {isCorrect === false && (
                      <Button
                        variant="outline"
                        className="w-full border-cyan-200 hover:bg-cyan-50 transition-all duration-200 flex items-center justify-center"
                        onClick={handleLearnTogether}
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        Aprendamos juntos
                      </Button>
                    )}

                    {/* Componente de feedback - aparece para todas las respuestas */}
                    <div className="flex items-center justify-between mt-4 mb-4 md:mt-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          ¿Qué te pareció esta pregunta?
                        </span>
                        <QuestionFeedback
                          onFeedbackSubmit={handleFeedbackSelect}
                          resetKey={currentQuestionIndex}
                        />
                      </div>
                    </div>
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
                className="bg-teal-400 w-full md:w-auto  "
              >
                Siguiente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleFinish}
                disabled={!selectedOption}
                className="bg-teal-400 w-full md:w-auto  "
              >
                Finalizar
                <CheckCircle2 className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      <LearnTogether
        showExplanation={showExplanation}
        setShowExplanation={setShowExplanation}
        currentQuestion={currentQuestion}
        explanation={explanation}
        isLoadingExplanation={isLoadingExplanation}
        correctOption={correctOption}
      />
    </div>
  );
};

export default QuizPage;
