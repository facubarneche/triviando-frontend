'use client';

import { useState } from 'react';
import { topicsMock } from './helpers';
import Header from './components/Header';
import Filter from './components/Filter';
import Topics from './components/Topics';

export default function TopicsPage() {
  const [searchTerm, setSearchTerm] = useState('');

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
