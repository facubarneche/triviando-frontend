'use client';

import { motion } from 'framer-motion';
import NewTopicCard from './NewTopicCard';
import TopicCardLoader from './TopicCardLoader';
import TopicCard from '@/app/components/topic-card';
import { useEffect, useState } from 'react';
import { ITopic, ITopicDTO } from '../types';
import { topicService } from '@/app/services/topicService';
import { handleError } from '@/app/utils/errorHandler';
import { toast } from 'react-toastify';

interface TopicsProps {
  topics: ITopic[];
}

const Topics = ({ topics }: TopicsProps) => {
  const [creating, setCreating] = useState<null | string>(null); // nombre del tópico en creación
  const [localTopics, setLocalTopics] = useState<ITopic[]>(topics); // estado local de tópicos

  // Restaurar el estado desde sessionStorage al montar
  useEffect(() => {
    const stored = sessionStorage.getItem('creatingTopic');
    if (stored) setCreating(stored);
  }, []);

  // Sincronizar con props iniciales (opcional si siempre se renderiza con los mismos topics)
  useEffect(() => {
    setLocalTopics(topics);
  }, [topics]);

  // Limpiar el loader si el tópico real ya existe
  useEffect(() => {
    if (creating && localTopics.some((t) => t.name === creating)) {
      setCreating(null);
      sessionStorage.removeItem('creatingTopic');
    }
  }, [localTopics, creating]);

  const handleCreateTopic = async (name: string, context: string) => {
    setCreating(name);
    sessionStorage.setItem('creatingTopic', name);
    try {
      // Crear el tópico vía servicio y obtener el array de tópicos
      const response = await topicService.createTopic(name, context);

      // Buscar el tópico recién creado en la respuesta
      const created = (response as ITopicDTO[]).find((t: ITopicDTO) => t.topic === name);
      if (created) {
        const newTopic: ITopic = {
          name: created.topic,
          icon: created.emoji,
          color: '#06b6d4',
          questionsCount: created.size,
        };
        setLocalTopics((prev) => [...prev, newTopic]);
        toast.success(`Tópico "${created.topic}" creado exitosamente.`);
      } else {
        toast.error('Ocurrió un error al crear el tópico. Intenta nuevamente.');
      }
    } catch (error) {
      handleError(error);
    } finally {
      setCreating(null);
      sessionStorage.removeItem('creatingTopic');
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <motion.div
        key={'new-topic'}
        initial={{ opacity: 0, x: 70, y: 40 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NewTopicCard onCreateTopic={handleCreateTopic} />
      </motion.div>

      {creating && <TopicCardLoader name={creating} />}

      {localTopics.map((topic, index) => (
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
