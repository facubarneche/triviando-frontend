import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { IQuiz, LetterType } from '../types';

interface LearnTogetherProps {
  showExplanation: boolean;
  setShowExplanation: (state: boolean) => void;
  isLoadingExplanation: boolean;
  currentQuestion: IQuiz;
  explanation: string;
  correctOption: { text: string; letter: LetterType };
}

const LearnTogether = ({
  showExplanation,
  setShowExplanation,
  isLoadingExplanation,
  currentQuestion,
  explanation,
  correctOption,
}: LearnTogetherProps) => {
  const { id, question } = currentQuestion;
  const { text, letter } = correctOption;
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
              <p className="mt-1">
                <span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-cyan-200 text-cyan-900 font-semibold text-xs mr-2 shadow-sm border border-cyan-300 border-2">
                    {letter}{' '}
                  </span>
                  {text}
                </span>
              </p>
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
