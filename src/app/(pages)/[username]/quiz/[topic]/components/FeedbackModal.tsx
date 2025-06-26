'use client';

import type React from 'react';

import { useState } from 'react';

import { motion } from 'framer-motion';
import { AlertTriangle, Send } from 'lucide-react';
import { feedbackOptions } from '../helpers';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Button } from '@/app/components/ui/button';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedbackType: string, description?: string) => void;
  isSubmitting?: boolean;
}



export default function FeedbackModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}: FeedbackModalProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [customDescription, setCustomDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedOption) {
      setError('Por favor selecciona una opción');
      return;
    }

    if (selectedOption === 'other' && !customDescription.trim()) {
      setError('Por favor describe el problema');
      return;
    }

    const description =
      selectedOption === 'other'
        ? customDescription.trim()
        : feedbackOptions.find((opt) => opt.id === selectedOption)?.label || '';

    onSubmit('negative', description);
    handleClose();
  };

  const handleClose = () => {
    setSelectedOption('');
    setCustomDescription('');
    setError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-red-600 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Reportar Problema
          </DialogTitle>
          <DialogDescription>
            Ayúdanos a mejorar seleccionando el tipo de problema que encontraste con esta pregunta.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <RadioGroup
              value={selectedOption}
              onValueChange={(value: React.SetStateAction<string>) => {
                setSelectedOption(value);
                setError('');
              }}
              className="space-y-3"
            >
              {feedbackOptions.map((option) => (
                <motion.div
                  key={option.id}
                  className="flex items-start space-x-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={option.id} className="text-sm font-medium cursor-pointer">
                      {option.label}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                  </div>
                </motion.div>
              ))}
            </RadioGroup>

            {/* Textarea para "Otro" */}
            {selectedOption === 'other' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-2"
              >
                <Label htmlFor="custom-description" className="text-sm font-medium">
                  Describe el problema:
                </Label>
                <Textarea
                  id="custom-description"
                  placeholder="Explica detalladamente cuál es el problema con esta pregunta..."
                  value={customDescription}
                  onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
                    setCustomDescription(e.target.value);
                    setError('');
                  }}
                  className="min-h-[100px] border-cyan-200 focus:border-cyan-400"
                />
              </motion.div>
            )}

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-2"
              >
                {error}
              </motion.p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-gray-200 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                  />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Reporte
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
