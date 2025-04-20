import { capitalize } from '@/app/lib/capitalize';
import { ITopic, ITopicDTO } from './types';
import { TOPIC_COLORS, TOPIC_ICONS } from './constants';

export const topicsMock = [
  {
    id: '680423b2f5f2795df4d861e0',
    name: 'Fundamentos de Programación',
    icon: '💻',
    color: 'bg-gray-500',
    questionsCount: 50,
  },
  {
    id: '680423b2f5f2795df4d861e1',
    name: 'Programación Orientada a Objetos',
    icon: '🧑‍💻',
    color: 'bg-blue-500',
    questionsCount: 75,
  },
  {
    id: '680423b2f5f2795df4d861e2',
    name: 'Estructuras de Datos',
    icon: '📊',
    color: 'bg-green-500',
    questionsCount: 60,
  },
  {
    id: '680423b2f5f2795df4d861e3',
    name: 'Algoritmos',
    icon: '⚙️',
    color: 'bg-red-500',
    questionsCount: 80,
  },
  {
    id: '680423b2f5f2795df4d861e4',
    name: 'Desarrollo Web',
    icon: '🌐',
    color: 'bg-teal-500',
    questionsCount: 90,
  },
  {
    id: '680423b2f5f2795df4d861e5',
    name: 'Bases de Datos',
    icon: '💾',
    color: 'bg-purple-500',
    questionsCount: 70,
  },
  {
    id: '680423b2f5f2795df4d861e6',
    name: 'Inteligencia Artificial',
    icon: '🤖',
    color: 'bg-indigo-500',
    questionsCount: 100,
  },
  {
    id: '680423b2f5f2795df4d861e7',
    name: 'Machine Learning',
    icon: '📈',
    color: 'bg-yellow-500',
    questionsCount: 85,
  },
  {
    id: '680423b2f5f2795df4d861e8',
    name: 'Desarrollo Móvil',
    icon: '📱',
    color: 'bg-pink-500',
    questionsCount: 65,
  },
  {
    id: '680423b2f5f2795df4d861e9',
    name: 'Testing de Software',
    icon: '🧪',
    color: 'bg-orange-500',
    questionsCount: 55,
  },
];

export const parserTopics = (topics: ITopicDTO[]): ITopic[] => {
  return topics.map((topic, index) => ({
    id: topic.id,
    name: capitalize(topic.topico),
    icon: TOPIC_ICONS[topic.topico.toLowerCase()] || '❓',
    color: TOPIC_COLORS[index % TOPIC_COLORS.length],
    questionsCount: topic.cantidadPreguntas,
  }));
};
