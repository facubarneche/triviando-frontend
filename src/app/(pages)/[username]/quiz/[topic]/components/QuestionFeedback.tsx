'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { QuestionFeedbackProps } from '../types';
import FeedbackModal from './FeedbackModal';
import { Button } from '@/app/components/ui/button';

export default function QuestionFeedback({
  onFeedbackSubmit,
  disabled = false,
  resetKey, // Nuevo prop para resetear el estado
}: QuestionFeedbackProps) {
  const [positiveFeedback, setPositiveFeedback] = useState(false);
  const [negativeFeedback, setNegativeFeedback] = useState(false);
  const [showNegativeModal, setShowNegativeModal] = useState(false);
  const lastResetKey = useRef(resetKey);

  // Reset del estado cuando cambie la pregunta
  useEffect(() => {
    if (resetKey !== lastResetKey.current) {
      setPositiveFeedback(false);
      setNegativeFeedback(false);
      setShowNegativeModal(false);
      lastResetKey.current = resetKey;
    }
  }, [resetKey]);

  const handlePositiveFeedback = () => {
    if (disabled) return;

    // Si ya está seleccionado positivo, desactivarlo
    if (positiveFeedback) {
      setPositiveFeedback(false);
      // Notificar que se removió el feedback
      onFeedbackSubmit('none');
      return;
    }

    // Actualizar el estado visual inmediatamente para una mejor UX
    setPositiveFeedback(true);
    setNegativeFeedback(false);

    // Notificar al componente padre del feedback seleccionado
    onFeedbackSubmit('positive');
  };

  const handleNegativeFeedback = () => {
    if (disabled) return;

    // Si ya está seleccionado negativo, desactivarlo
    if (negativeFeedback) {
      setNegativeFeedback(false);
      // Notificar que se removió el feedback
      onFeedbackSubmit('none');
      return;
    }

    setShowNegativeModal(true);
  };

  const handleNegativeFeedbackSubmit = (feedbackType: string, description?: string) => {
    // Actualizar el estado visual inmediatamente para una mejor UX
    setNegativeFeedback(true);
    setPositiveFeedback(false);
    setShowNegativeModal(false);

    // Notificar al componente padre del feedback seleccionado
    onFeedbackSubmit(feedbackType, description);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Botón de feedback positivo */}
        <motion.div
          whileHover={{ scale: disabled ? 1 : 1.1 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePositiveFeedback}
            disabled={disabled}
            className={`p-2 h-auto transition-all duration-200 ${
              positiveFeedback
                ? 'text-green-600 bg-green-50 hover:bg-green-100'
                : 'text-gray-400 hover:text-green-500 hover:bg-green-50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ThumbsUp className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Botón de feedback negativo */}
        <motion.div
          whileHover={{ scale: disabled ? 1 : 1.1 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNegativeFeedback}
            disabled={disabled}
            className={`p-2 h-auto transition-all duration-200 ${
              negativeFeedback
                ? 'text-red-600 bg-red-50 hover:bg-red-100'
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ThumbsDown className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      {/* Modal de feedback negativo */}
      <FeedbackModal
        isOpen={showNegativeModal}
        onClose={() => setShowNegativeModal(false)}
        onSubmit={handleNegativeFeedbackSubmit}
      />
    </>
  );
}
