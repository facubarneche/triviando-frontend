import { ITopic, ITopicDTO } from '../types';
import { TOPIC_COLORS } from './constants';

export const parserTopics = (topics: ITopicDTO[]): ITopic[] => {
  return topics.map((topic, index) => ({
    name: topic.topic,
    icon: topic.emoji,
    color: TOPIC_COLORS[index % TOPIC_COLORS.length],
    questionsCount: topic.size,
  }));
};
