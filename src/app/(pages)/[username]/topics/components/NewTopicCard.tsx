'use client';
import { Card, CardContent } from '@/app/components/ui/card';
import AnimatedContainer, { useCardAnimation } from '@/app/components/AnimatedContainer';
import { Plus, Sparkles } from 'lucide-react';
import NewTopicModal from './NewTopicModal';
import { useState } from 'react';

interface NewTopicCardProps {
  onGenerateTopic: (name: string) => Promise<void>;
}

const NewTopicCard = ({ onGenerateTopic }: NewTopicCardProps) => {
  const [open, setOpen] = useState(false);
  const cardAnimation = useCardAnimation();

  return (
    <AnimatedContainer style={{ height: '100%' }} animation="fade" {...cardAnimation}>
      <Card
        hover={true}
        className="h-full border-0 shadow-lg bg-white/90 backdrop-blur-sm transition-shadow duration-200 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 flex items-center justify-center mb-4 shadow-md">
            <Plus className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-1 text-cyan-700">Crear Nuevo Tema</h3>
          <p className="text-sm text-muted-foreground">Personaliza tus preguntas</p>
          <div className="mt-2 flex items-center justify-center gap-1 text-teal-500 font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Generado con IA</span>
          </div>
        </CardContent>
      </Card>
      <NewTopicModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onGenerateTopic={({ name }) => onGenerateTopic(name)}
      />
    </AnimatedContainer>
  );
};

export default NewTopicCard;
