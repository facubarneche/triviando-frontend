'use client';

import { useState } from 'react';
import { Lightbulb, Save } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';

interface CreateTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTopic: (topic: { name: string; context: string }) => void;
}

export default function CreateTopicModal({
  isOpen,
  onClose,
  onCreateTopic,
}: CreateTopicModalProps) {
  const [topicName, setTopicName] = useState('');
  const [topicContext, setTopicContext] = useState('');
  const [errors, setErrors] = useState<{ name?: string; context?: string; general?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación
    const newErrors: { name?: string; context?: string } = {};
    if (!topicName.trim()) newErrors.name = 'El nombre del tema es obligatorio';
    if (!topicContext.trim()) newErrors.context = 'La descripción del tema es obligatoria';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (onCreateTopic) onCreateTopic({ name: topicName, context: topicContext });
    setTopicName('');
    setTopicContext('');
    onClose();
  };

  const handleClose = () => {
    setTopicName('');
    setTopicContext('');
    setErrors({});
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="sm:max-w-[500px] w-full max-w-[95vw] bg-white p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-cyan-700 text-xl">Crear Nuevo Tema</DialogTitle>
          <DialogDescription>
            Crea un nuevo tema para generar preguntas personalizadas con IA.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="topic-name" className="text-cyan-700">
                Nombre del tema
              </Label>
              <Input
                id="topic-name"
                placeholder="Ej: Astronomía, Literatura, Programación..."
                value={topicName}
                onChange={(e) => {
                  setTopicName(e.target.value);
                  if (errors.name) {
                    setErrors({ ...errors, name: undefined });
                  }
                }}
                className={`border-cyan-200 focus:border-cyan-400 ${
                  errors.name ? 'border-red-500' : ''
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic-context" className="text-cyan-700 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-teal-500" />
                Contexto para la IA
              </Label>
              <Textarea
                id="topic-context"
                placeholder="Describe el tipo de preguntas que quieres generar. Ej: Preguntas sobre bases de datos, patrones de diseño, estructura de datos para nivel intermedio."
                value={topicContext}
                onChange={(e) => {
                  setTopicContext(e.target.value);
                  if (errors.context) {
                    setErrors({ ...errors, context: undefined });
                  }
                }}
                className={`min-h-[120px] border-cyan-200 focus:border-cyan-400 ${
                  errors.context ? 'border-red-500' : ''
                }`}
              />
              {errors.context && <p className="text-red-500 text-xs mt-1">{errors.context}</p>}
              <p className="text-xs text-muted-foreground">
                Este contexto ayudará a la IA a generar preguntas más relevantes y precisas sobre el
                tema.
              </p>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="border-cyan-200 hover:bg-cyan-50 text-cyan-700"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              Crear Tema
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
