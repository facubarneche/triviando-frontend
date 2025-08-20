'use client';

import Link from 'next/link';
import { Card, CardContent } from '../components/ui/card';
import { motion } from 'framer-motion';
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
        <Card className="h-full border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className={`w-16 h-16 rounded-full ${color} flex items-center justify-center mb-4 shadow-md`}
            >
              <span className="text-3xl">{icon}</span>
            </motion.div>
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <p className="text-sm text-muted-foreground">{questionsCount} preguntas</p>
          </CardContent>
        </Card>
      </AnimatedContainer>
    </Link>
  );
}
