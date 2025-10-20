'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { quizService } from '@/app/services/quizService';
import { handleError } from '@/app/utils/errorHandler';
import { extractPlanLimitMessage, isPlanLimitError } from '@/app/utils/planLimitErrors';
import { toast } from 'react-toastify';
import { Sparkles, Zap, Brain } from 'lucide-react';

interface GenerateQuestionsModalProps {
  open: boolean;
  topicName: string;
  onClose: () => void;
  onSuccess?: () => void;
  onPlanLimit?: (message: string | null) => void;
}

export function GenerateQuestionsModal({
  open,
  topicName,
  onClose,
  onSuccess,
  onPlanLimit,
}: GenerateQuestionsModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleOpenChange = (value: boolean) => {
    if (!value && !isGenerating) {
      onClose();
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await quizService.generateQuiz(topicName);
      toast.success('¡Preguntas generadas con éxito! Ya puedes jugar 🎉');
      await onSuccess?.();
      onClose();
    } catch (error) {
      if (isPlanLimitError(error, 'questions')) {
        onPlanLimit?.(extractPlanLimitMessage(error));
        onClose();
      } else {
        handleError(error);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[540px] border-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-0 overflow-hidden">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

        {/* Animated sparkles */}
        <div className="absolute top-4 right-4 animate-pulse">
          <Sparkles className="w-6 h-6 text-teal-400" />
        </div>
        <div className="absolute top-8 left-8 animate-pulse delay-150">
          <Sparkles className="w-4 h-4 text-cyan-400" />
        </div>

        <div className="relative p-8">
          <DialogHeader className="space-y-4">
            {/* Icon */}
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/50">
              <Brain className="w-8 h-8 text-white" />
            </div>

            <DialogTitle className="text-center text-3xl font-bold bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              ¡Generá preguntas nuevas!
            </DialogTitle>

            <DialogDescription className="text-center text-slate-300 text-base leading-relaxed">
              Este tópico todavía no tiene preguntas activas.
              <br />
              <span className="text-teal-400 font-semibold">
                ¿Querés generar un nuevo set ahora mismo?
              </span>
            </DialogDescription>
          </DialogHeader>

          {/* Features */}
          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="mt-0.5">
                <Zap className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Generación instantánea</p>
                <p className="text-xs text-slate-400">Preguntas creadas por IA en segundos</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="mt-0.5">
                <Brain className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Contenido personalizado</p>
                <p className="text-xs text-slate-400">Adaptado específicamente a tu tópico</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="mt-0.5">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Listo para jugar</p>
                <p className="text-xs text-slate-400">Empezá tu quiz inmediatamente</p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col gap-3 mt-8">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full h-12 bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-400 hover:from-teal-500 hover:via-cyan-600 hover:to-teal-500 text-white font-semibold shadow-lg shadow-teal-500/50 hover:shadow-teal-500/70 transition-all duration-300 border-0"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Generando preguntas...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Generar preguntas ahora
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              onClick={onClose}
              disabled={isGenerating}
              className="w-full text-slate-300 hover:text-white hover:bg-white/10"
            >
              Tal vez después
            </Button>
          </DialogFooter>

          {/* Info text */}
          <p className="text-xs text-center text-slate-500 mt-4 px-4">
            💎 Con Premium podés generar preguntas ilimitadas en todos tus tópicos
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default GenerateQuestionsModal;
