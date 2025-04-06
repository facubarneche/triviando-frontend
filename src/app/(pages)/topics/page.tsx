'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Search, LogOut } from 'lucide-react';
import { Input } from '../../components/ui/input';
import TopicCard from '../../components/topic-card';
import { motion } from 'framer-motion';

const topics = [
  { id: 1, name: 'Ciencia', icon: '🔬', color: 'bg-cyan-500', questions: 25 },
  { id: 2, name: 'Historia', icon: '🏛️', color: 'bg-amber-500', questions: 30 },
  { id: 3, name: 'Geografía', icon: '🌍', color: 'bg-green-500', questions: 20 },
  { id: 4, name: 'Películas', icon: '🎬', color: 'bg-red-500', questions: 15 },
  { id: 5, name: 'Música', icon: '🎵', color: 'bg-purple-500', questions: 22 },
  { id: 6, name: 'Deportes', icon: '⚽', color: 'bg-orange-500', questions: 18 },
];

export default function Topics() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTopics = topics.filter((topic) =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600">
      <header className="p-4 flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-white"
        >
          Elige un Tema
        </motion.h1>
        <div className="flex gap-2">
          <Button variant="ghost" className="text-white hover:bg-white/20" asChild>
            <Link href="/profile">Perfil</Link>
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/20" asChild>
            <Link href="/leaderboard">Ranking</Link>
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/20">
            <LogOut className="h-4 w-4 mr-2" />
            Salir
          </Button>
        </div>
      </header>

      <main className="p-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="mb-6 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-3">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar temas..."
                  className="pl-8 border-cyan-200 focus:border-cyan-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <TopicCard topic={topic} />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
