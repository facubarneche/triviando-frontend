'use client';

import { useEffect, useState } from 'react';
import { topicsMock } from './helpers';
import Header from './components/Header';
import Filter from './components/Filter';
import Topics from './components/Topics';
import { topicService } from '@/app/services/topicService';
import axios from 'axios';

export default function TopicsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getTopics = async () => {
      try {
        const topics = await topicService.getTopics();
        console.log(topics);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.data?.error) {
          throw new Error(error.response.data.error);
        }
        throw new Error('Hubo un error al obtener los topicos');
      }
    };
    getTopics();
  }, []);

  const filteredTopics = topicsMock.filter((topic) =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600">
      <Header />
      <main className="p-4 max-w-4xl mx-auto">
        <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Topics filteredTopics={filteredTopics} />
      </main>
    </div>
  );
}
