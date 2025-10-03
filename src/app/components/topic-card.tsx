'use client';

import Link from 'next/link';
import { Card, CardContent } from '../components/ui/card';
import AnimatedContainer, { useCardAnimation } from './AnimatedContainer';
import { ITopic } from '../(pages)/[username]/topics/types';
import { useParams } from 'next/navigation';

interface TopicCardProps {
  readonly topic: ITopic;
}

export default function TopicCard({ topic }: TopicCardProps) {
  const { username } = useParams<{ username: string }>();
  const { name, questionsCount, color, icon } = topic;
  const cardAnimation = useCardAnimation();

  return (
    <Link href={{ pathname: `/${username}/quiz/${name}` }}>
      <AnimatedContainer animation="fade" style={{ height: '100%' }} {...cardAnimation}>
        <Card
          hover={true}
          className="h-full border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <AnimatedContainer animation="bounce" delay={0.2}>
              <div
                className={`w-16 h-16 rounded-full ${color} flex items-center justify-center mb-4 shadow-md`}
              >
                <span className="text-3xl">{icon}</span>
              </div>
            </AnimatedContainer>
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <p className="text-sm text-muted-foreground">{questionsCount} preguntas</p>
          </CardContent>
        </Card>
      </AnimatedContainer>
    </Link>
  );
}
