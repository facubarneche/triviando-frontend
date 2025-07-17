'use client';

import { motion } from 'framer-motion';
import NewTopicCard from './NewTopicCard';
import TopicCardLoader from './TopicCardLoader';
import TopicCard from '@/app/components/topic-card';
import { ITopic } from '../types';

interface CreatingTopic {
  name: string;
  timestamp: number;
}

interface TopicsProps {
  topics: ITopic[];
  creatingTopics: CreatingTopic[];
  onCreateTopic: (name: string) => Promise<void>;
}

const Topics = ({ topics, creatingTopics, onCreateTopic }: TopicsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <motion.div
        key={'new-topic'}
        initial={{ opacity: 0, x: 70, y: 40 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NewTopicCard onCreateTopic={onCreateTopic} />
      </motion.div>

      {/* Render creating topics */}
      {creatingTopics.map((creatingTopic) => (
        <TopicCardLoader key={`creating-${creatingTopic.name}`} name={creatingTopic.name} />
      ))}

      {topics.map((topic, index) => (
        <motion.div
          key={topic.name}
          initial={{ opacity: 0, x: 70, y: 40 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
        >
          <TopicCard topic={topic} />
        </motion.div>
      ))}
    </div>
  );
};

export default Topics;
