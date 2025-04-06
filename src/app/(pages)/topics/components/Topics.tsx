import TopicCard from '@/app/components/topic-card';
import { motion } from 'framer-motion';
import { IfilteredTopics } from './types';

interface TopicsProps {
  filteredTopics: IfilteredTopics[];
}

const Topics = ({ filteredTopics }: TopicsProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {filteredTopics.map((topic, index) => (
      <motion.div
        key={topic.id}
        initial={{ opacity: 0, x: 70, y: 40 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      >
        <TopicCard topic={topic} />
      </motion.div>
    ))}
  </div>
);

export default Topics;
