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
import { getUserIdCSR } from '@/app/utils/getUserIdCSR';
import { toast } from 'react-toastify';

export default function TopicsPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [creating, setCreating] = useState<string | null>(null);

  useEffect(() => {
    const getTopics = async () => {
      try {
        const id = getUserIdCSR();
        const topics = await topicService.getTopics({ id });
        const parsedTopics = parserTopics(topics);
        setTopics(parsedTopics);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    getTopics();
  }, []);

  const handleCreateTopic = async (name: string, context: string) => {
    setCreating(name);
    try {
      const response = await topicService.createTopic(name, context);
      const created = (response as ITopicDTO[]).find((t: ITopicDTO) => t.topic === name);
      if (created) {
        const newTopic: ITopic = {
          name: created.topic,
          icon: created.emoji,
          color: '#06b6d4',
          questionsCount: created.size,
        };
        setTopics((prev) =>
          prev.some((t) => t.name === newTopic.name) ? prev : [...prev, newTopic],
        );
        toast.success(`Tópico "${created.topic}" creado exitosamente.`);
      } else {
        toast.error('Ocurrió un error al crear el tópico. Intenta nuevamente.');
      }
    } catch (error) {
      handleError(error);
    } finally {
      setCreating(null);
    }
  };

  const filteredTopics = topics.filter((topic) =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600">
      <Header />
      <main className="p-4 max-w-4xl mx-auto">
        <StreakModal />
        <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {loading ? (
          <TopicsSkeleton />
        ) : (
          <Topics topics={filteredTopics} creating={creating} onCreateTopic={handleCreateTopic} />
        )}
      </main>
    </div>
  );
}
