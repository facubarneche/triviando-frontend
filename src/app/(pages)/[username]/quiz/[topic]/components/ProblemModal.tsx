import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

const ProblemModal = () => {
  const { username } = useParams<{ username: string }>();
  const { push } = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm p-8 w-full max-w-md">
        <div className="flex flex-col items-center justify-center">
          <X className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-medium">No se pudieron cargar las preguntas</h2>
          <p className="text-muted-foreground mt-2 text-center">
            Hubo un problema al generar el quiz. Por favor, intenta de nuevo.
          </p>
          <Button
            className="mt-6 bg-gradient-to-r from-teal-400 to-cyan-600 hover:from-teal-500 hover:to-cyan-700 cursor-pointer"
            onClick={() => push(`/${username}/topics`)}
          >
            Volver a Temas
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProblemModal;
