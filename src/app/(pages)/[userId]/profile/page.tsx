'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Edit, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import { Progress } from '@/app/components/ui/progress';
import { Badge } from '@/app/components/ui/badge';
import ProfileInfo from './components/ProfileInfo';

// Mock data
const userData = {
  username: 'QuizChampion',
  firstName: 'Carlos',
  lastName: 'Rodríguez',
  email: 'champion@example.com',
  joinDate: 'Marzo 2023',
  totalQuizzes: 42,
  correctAnswers: 378,
  totalQuestions: 520,
  badges: [
    { name: 'Experto en Ciencia', icon: '🔬', description: 'Completó 10 quizzes de ciencia' },
    { name: 'Historiador', icon: '🏛️', description: '90% de precisión en quizzes de historia' },
    { name: 'Pensador Rápido', icon: '⚡', description: 'Completó un quiz en menos de 2 minutos' },
  ],
  recentActivity: [
    { topic: 'Geografía', date: 'hace 2 días', score: '8/10', percentage: 80 },
    { topic: 'Películas', date: 'hace 5 días', score: '7/10', percentage: 70 },
    { topic: 'Ciencia', date: 'hace 1 semana', score: '9/10', percentage: 90 },
  ],
};

export default function Profile() {
  const router = useRouter();
      const accuracy = Math.round((userData.correctAnswers / userData.totalQuestions) * 100);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600">
      <header className="p-4">
        <Link
          href="/topics"
          className="inline-flex items-center text-white hover:text-[#9d4edd] transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Temas
        </Link>
      </header>

      <main className="p-4 max-w-3xl mx-auto">
        <ProfileInfo />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-[#3c096c]">Total de Quizzes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[#5a189a]">{userData.totalQuizzes}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-[#3c096c]">Respuestas Correctas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[#5a189a]">{userData.correctAnswers}</p>
                <p className="text-sm text-muted-foreground">
                  de {userData.totalQuestions} preguntas
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-[#3c096c]">Precisión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[#5a189a]">{accuracy}%</p>
                <Progress value={accuracy} className="h-2 mt-2 bg-[#9d4edd]/20" />
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
