'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState, useCallback, type MouseEventHandler } from 'react';
import { Card, CardContent } from '../components/ui/card';
import AnimatedContainer, { useCardAnimation } from './AnimatedContainer';
import { ITopic } from '../(pages)/[username]/topics/types';
import { GenerateQuestionsModal } from './modals/GenerateQuestionsModal';
import { QuestionLimitModal } from './modals/QuestionLimitModal';
import { useTopicCreationStore } from '@/app/stores/topicCreationStore';

interface TopicCardProps {
  readonly topic: ITopic;
}

export default function TopicCard({ topic }: TopicCardProps) {
  const { username } = useParams<{ username: string }>();
  const router = useRouter();
  const refreshCallback = useTopicCreationStore((state) => state.refreshCallback);
  const { name, questionsCount, color, icon } = topic;
  const cardAnimation = useCardAnimation();
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showQuestionLimitModal, setShowQuestionLimitModal] = useState(false);
  const [questionLimitMessage, setQuestionLimitMessage] = useState<string | null>(null);

  const encodedTopic = encodeURIComponent(name);

  const handleCardClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (questionsCount > 0) return;
    event.preventDefault();
    setShowGenerateModal(true);
  };

  const handlePlanLimit = useCallback((message: string | null) => {
    setQuestionLimitMessage(message);
    setShowQuestionLimitModal(true);
  }, []);

  const handleGenerateSuccess = useCallback(async () => {
    setShowGenerateModal(false);
    try {
      if (refreshCallback) {
        await refreshCallback();
      }
    } catch (error) {
      console.warn('Error refreshing topics after generating questions', error);
    } finally {
      router.push(`/${username}/quiz/${encodedTopic}`);
    }
  }, [encodedTopic, refreshCallback, router, username]);

  const normalizedColor = color || '#06b6d4';
  const isDirectColor = normalizedColor.startsWith('#') || normalizedColor.startsWith('rgb');
  const iconWrapperClass = isDirectColor ? '' : normalizedColor;
  const iconWrapperStyle = isDirectColor ? { backgroundColor: normalizedColor } : undefined;

  return (
    <>
      <Link href={`/${username}/quiz/${encodedTopic}`} onClick={handleCardClick}>
        <AnimatedContainer animation="fade" style={{ height: '100%' }} {...cardAnimation}>
          <Card
            hover={true}
            className="h-full border-0 shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-300 cursor-pointer"
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <AnimatedContainer animation="bounce" delay={0.2}>
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-md ${iconWrapperClass}`.trim()}
                  style={iconWrapperStyle}
                >
                  <span className="text-3xl">{icon}</span>
                </div>
              </AnimatedContainer>
              <h3 className="text-xl font-bold mb-1">{name}</h3>
              {questionsCount > 0 ? (
                <p className="text-sm text-muted-foreground">{questionsCount} preguntas</p>
              ) : (
                <p className="text-sm text-amber-600 font-medium">Generar nuevas preguntas</p>
              )}
            </CardContent>
          </Card>
        </AnimatedContainer>
      </Link>

      <GenerateQuestionsModal
        open={showGenerateModal}
        topicName={name}
        onClose={() => setShowGenerateModal(false)}
        onSuccess={handleGenerateSuccess}
        onPlanLimit={handlePlanLimit}
      />

      <QuestionLimitModal
        open={showQuestionLimitModal}
        message={questionLimitMessage}
        onClose={() => {
          setShowQuestionLimitModal(false);
          setQuestionLimitMessage(null);
        }}
        onKeepPracticing={() => {
          setShowQuestionLimitModal(false);
          setQuestionLimitMessage(null);
        }}
      />
    </>
  );
}
