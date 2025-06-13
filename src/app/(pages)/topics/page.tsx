'use client';

import { useEffect, useState } from 'react';
import { parserTopics } from './utils/helpers';
import Header from './components/Header';
import Filter from './components/Filter';
import Topics from './components/Topics';
import { topicService } from '@/app/services/topicService';
import { ITopic } from './types';
import TopicsSkeleton from './components/TopicsSkeleton';
import { StreakModal } from '@/app/components/modals/StreakModal';
import { handleError } from '@/app/utils/errorHandler';
import { getUserIdCSR } from '@/app/lib/getUserIdCSR';

export default function TopicsPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  const filteredTopics = topics.filter((topic) =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600">
      <Header />
      <main className="p-4 max-w-4xl mx-auto">
        <StreakModal />
        {/* TODO: Cambiar filter a use client y dejar todo SSR */}
        <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {loading ? <TopicsSkeleton /> : <Topics topics={filteredTopics} />}
      </main>
    </div>
  );
}
