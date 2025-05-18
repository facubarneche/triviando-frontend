'use client';
import { Card, CardContent } from '@/app/components/ui/card';
import { motion } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';
import NewTopicModal from './NewTopicModal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewTopicCard = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleCreateTopic = () => {
    setOpen(false); // Cierra el modal
    router.refresh(); // Refresca la ruta actual (/topics)
  };
  
  return (
    <motion.div
      style={{ height: '100%' }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Card
        className="h-[200px] border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 flex items-center justify-center mb-4 shadow-md"
          >
            <Plus className="h-6 w-6 text-white" />
          </motion.div>
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
        onCreateTopic={handleCreateTopic}
      />
    </motion.div>
  );
};

export default NewTopicCard;
