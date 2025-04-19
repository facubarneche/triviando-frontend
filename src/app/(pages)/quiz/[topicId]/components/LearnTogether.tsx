import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { IQuiz } from '../types';

interface LearnTogetherProps {
  showExplanation: boolean;
  setShowExplanation: (state: boolean) => void;
  isLoadingExplanation: boolean;
  currentQuestion: IQuiz;
  explanation: string;
}

const LearnTogether = ({
  showExplanation,
  setShowExplanation,
  isLoadingExplanation,
  currentQuestion,
  explanation,
}: LearnTogetherProps) => {
  const { id, question, correctAnswer } = currentQuestion;
  return (
    <Dialog open={showExplanation} onOpenChange={setShowExplanation}>
      <DialogContent className="max-w-xl m-0 bg-white">
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
              <p className="mt-1">{question}</p>
              <p className="font-medium text-cyan-800 mt-3">Respuesta correcta:</p>
              <p className="mt-1">{correctAnswer}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Explicación:</h3>
              <div className="prose max-w-none">
                {explanation.split('\n').map((paragraph) => (
                  <p key={id}>{paragraph}</p>
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
  );
};

export default LearnTogether;
