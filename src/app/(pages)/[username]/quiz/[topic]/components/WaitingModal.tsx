import { Card } from '@/app/components/ui/card';
import { Loader2 } from 'lucide-react';

interface WaitingModalProps {
  topic: string;
}

const WaitingModal = ({ topic }: WaitingModalProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
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
};

export default WaitingModal;
