'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { QuestionFeedbackProps } from '../types';
import FeedbackModal from './FeedbackModal';
import { Button } from '@/app/components/ui/button';



export default function QuestionFeedback({
  onFeedbackSubmit,
  disabled = false,
}: QuestionFeedbackProps) {
  const [positiveFeedback, setPositiveFeedback] = useState(false);
  const [negativeFeedback, setNegativeFeedback] = useState(false);
  const [showNegativeModal, setShowNegativeModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePositiveFeedback = async () => {
    if (disabled || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onFeedbackSubmit('positive');
      setPositiveFeedback(true);
      setNegativeFeedback(false);
    } catch (error) {
      console.error('Error sending positive feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNegativeFeedback = () => {
    if (disabled || isSubmitting) return;
    setShowNegativeModal(true);
  };

  const handleNegativeFeedbackSubmit = async (feedbackType: string, description?: string) => {
    setIsSubmitting(true);
    try {
      await onFeedbackSubmit(feedbackType, description);
      setNegativeFeedback(true);
      setPositiveFeedback(false);
      setShowNegativeModal(false);
    } catch (error) {
      console.error('Error sending negative feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={disabled || isSubmitting}
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
            disabled={disabled || isSubmitting}
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
        isSubmitting={isSubmitting}
      />
    </>
  );
}
