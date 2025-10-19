'use client';

import { useEffect, useState } from 'react';
import { parserTopics } from './utils/helpers';
import Header from './components/Header';
import Filter from './components/Filter';
import Topics from './components/Topics';
import { topicService } from '@/app/services/topicService';
import { ITopic, ITopicDTO } from './types';
import TopicsSkeleton from './components/TopicsSkeleton';
import { StreakModal } from '@/app/components/modals/StreakModal';
import { handleError } from '@/app/utils/errorHandler';
import { useCurrentUserId } from '@/app/utils/auth';
import { toast } from 'react-toastify';
import { useTopicCreationStore } from '@/app/stores/topicCreationStore';

export default function TopicsPage() {
  const userId = useCurrentUserId();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { creatingTopics, setCreating, removeCreating, clearOldCreations, setRefreshCallback } =
    useTopicCreationStore();
  // Función para refrescar los tópicos
  const refreshTopics = async (): Promise<void> => {
    try {
      if (!userId) return;
      const topics = await topicService.getTopics({ id: userId });
      const parsedTopics = parserTopics(topics);
      setTopics(parsedTopics);
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    const getTopics = async () => {
      try {
        // Limpiar creaciones antiguas
        clearOldCreations();

        if (!userId) return;
        const topics = await topicService.getTopics({ id: userId });
        const parsedTopics = parserTopics(topics);
        setTopics(parsedTopics);

        // Verificar si algún tópico que se estaba creando ya existe
        creatingTopics.forEach((creatingTopic) => {
          const exists = parsedTopics.some(
            (t) => t.name.toLowerCase() === creatingTopic.name.toLowerCase(),
          );
          if (exists) {
            removeCreating(creatingTopic.name);
          }
        });
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    // Registrar la función de refresco en el store
    setRefreshCallback(refreshTopics);

    getTopics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]); // Depender del userId
  useEffect(() => {
    const checkForCompletedTopics = async () => {
      if (creatingTopics.length > 0 && !loading) {
        // Refrescar la lista para ver si algún tópico se completó
        try {
          await refreshTopics();

          // Verificar si algún tópico que se estaba creando ya existe
          creatingTopics.forEach((creatingTopic) => {
            const exists = topics.some(
              (t) => t.name.toLowerCase() === creatingTopic.name.toLowerCase(),
            );
            if (exists) {
              removeCreating(creatingTopic.name);
            }
          });
        } catch (error) {
          // Error en la verificación automática no debe ser mostrado al usuario
          console.warn('Error al verificar tópicos completados:', error);
        }
      }
    };

    // Solo ejecutar si no estamos cargando y hay tópicos creándose
    if (!loading && creatingTopics.length > 0) {
      checkForCompletedTopics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creatingTopics.length, loading]); // Usar solo length para evitar loops

  const handleCreateTopic = async (name: string) => {
    if (!userId) {
      toast.error('Error: Usuario no autenticado');
      return;
    }

    // Usar el store de Zustand para manejar el estado de creación
    setCreating(name);

    try {
      const response = await topicService.generateTopic(name);
      const created = (response as ITopicDTO[]).find((t: ITopicDTO) => t.topic === name);
      if (created) {
        const newTopic: ITopic = {
          name: created.topic,
          icon: created.emoji,
          color: '#06b6d4',
          questionsCount: created.size,
        };

        // Actualizar la lista local primero
        setTopics((prev) =>
          prev.some((t) => t.name === newTopic.name) ? prev : [...prev, newTopic],
        );

        toast.success(`Tópico "${created.topic}" creado exitosamente.`);

        // Remover del estado de creación (esto automáticamente ejecuta refresh)
        removeCreating(name);
      } else {
        toast.error('Ocurrió un error al crear el tópico. Intenta nuevamente.');
        removeCreating(name);
      }
    } catch (error) {
      handleError(error);
      removeCreating(name);
    }
  };
  const filteredTopics = topics.filter((topic) =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Obtener tópicos que se están creando y no existen aún
  const currentlyCreating = creatingTopics.filter(
    (creatingTopic) =>
      !topics.some((t) => t.name.toLowerCase() === creatingTopic.name.toLowerCase()),
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main className="p-4 max-w-4xl mx-auto">
        <StreakModal />
        <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {loading ? (
          <TopicsSkeleton />
        ) : (
          <Topics
            topics={filteredTopics}
            creatingTopics={currentlyCreating}
            onGenerateTopic={handleCreateTopic}
          />
        )}
      </main>
    </div>
  );
}
