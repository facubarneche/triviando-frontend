'use client';

import Link from 'next/link';
import { ArrowLeft, Edit, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Progress } from '@radix-ui/react-progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';

//Mock data
//Toda esta info me vendra en un endpoint de la API
const userData = {
  username: 'QuizChampion',
  email: 'champion@example.com',
  joinDate: 'March 2023',
  totalQuizzes: 42,
  correctAnswers: 378,
  totalQuestions: 520,
  badges: [
    { name: 'Science Expert', icon: '🔬', description: 'Completed 10 science quizzes' },
    { name: 'History Buff', icon: '🏛️', description: '90% accuracy in history quizzes' },
    { name: 'Quick Thinker', icon: '⚡', description: 'Completed a quiz in under 2 minutes' },
  ],
  recentActivity: [
    { topic: 'Geography', date: '2 days ago', score: '8/10', percentage: 80 },
    { topic: 'Movies', date: '5 days ago', score: '7/10', percentage: 70 },
    { topic: 'Science', date: '1 week ago', score: '9/10', percentage: 90 },
  ],
};

export default function Profile() {
  const accuracy = Math.round((userData.correctAnswers / userData.totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-700">
      <header className="p-4">
        <Link href="/topics" className="inline-flex items-center text-white hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Topics
        </Link>
      </header>

      <main className="p-4 max-w-3xl mx-auto">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-purple-200">
                <AvatarImage src="/placeholder-user.jpg" alt="@user" />
                <AvatarFallback className="text-2xl">QC</AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold">{userData.username}</h1>
                <p className="text-muted-foreground">{userData.email}</p>
                <p className="text-sm text-muted-foreground">Member since {userData.joinDate}</p>

                <div className="flex gap-2 mt-4 justify-center sm:justify-start">
                  <Button size="sm" variant="outline" className="gap-1">
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1 text-red-500 border-red-200 hover:bg-red-100 hover:text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{userData.totalQuizzes}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Correct Answers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{userData.correctAnswers}</p>
              <p className="text-sm text-muted-foreground">
                out of {userData.totalQuestions} questions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{accuracy}%</p>
              <Progress value={accuracy} className="h-2 mt-2" />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
