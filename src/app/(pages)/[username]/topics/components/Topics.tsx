'use client';

import AnimatedContainer, { AnimatedList } from '@/app/components/AnimatedContainer';
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
    <AnimatedList
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      staggerDelay={0.1}
    >
      <AnimatedContainer key={'new-topic'} animation="slideUp" delay={0}>
        <NewTopicCard onCreateTopic={onCreateTopic} />
      </AnimatedContainer>

      {/* Render creating topics */}
      {creatingTopics.map((creatingTopic) => (
        <TopicCardLoader key={`creating-${creatingTopic.name}`} name={creatingTopic.name} />
      ))}

      {topics.map((topic, index) => (
        <AnimatedContainer key={topic.name} animation="slideUp" delay={0.2 + index * 0.1}>
          <TopicCard topic={topic} />
        </AnimatedContainer>
      ))}
    </AnimatedList>
  );
};

export default Topics;
