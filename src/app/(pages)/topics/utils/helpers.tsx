import { capitalize } from '@/app/lib/capitalize';
import { ITopic, ITopicDTO } from '../types';
import { TOPIC_COLORS, TOPIC_ICONS } from './constants';

export const parserTopics = (topics: ITopicDTO[]): ITopic[] => {
  return Object.entries(topics).map(([key, value]) => ({
    name: capitalize(key),
    icon: TOPIC_ICONS[key.toLowerCase()] || '❓',
    color: TOPIC_COLORS[Object.keys(topics).indexOf(key) % TOPIC_COLORS.length],
    questionsCount: Number(value),
  }));
};
