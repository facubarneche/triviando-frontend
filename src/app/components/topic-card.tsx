'use client';

import Link from 'next/link';
import { Card, CardContent } from '../components/ui/card';
import { motion } from 'framer-motion';
import { ITopic } from '../(pages)/topics/types';

interface TopicCardProps {
  readonly topic: ITopic;
}

export default function TopicCard({ topic }: TopicCardProps) {
  const { name, questionsCount, color, icon } = topic;
  return (
    <Link href={{ pathname: `/quiz/${name}` }}>
      <motion.div
        style={{ height: '100%' }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
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
      </motion.div>
    </Link>
  );
}
