import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { leaderboardDataMock } from './utils/mocks';

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-700">
      <header className="p-4">
        <Link href="/topics" className="inline-flex items-center text-white hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Topics
        </Link>
      </header>

      <main className="p-4 max-w-3xl mx-auto">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Leaderboard</CardTitle>
            <CardDescription className="text-center">See who`s topping the charts</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="weekly">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="weekly">This Week</TabsTrigger>
                <TabsTrigger value="allTime">All Time</TabsTrigger>
              </TabsList>

              <TabsContent value="weekly">
                <LeaderboardTable data={leaderboardDataMock.weekly} />
              </TabsContent>

              <TabsContent value="allTime">
                <LeaderboardTable data={leaderboardDataMock.allTime} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

//TODO: Tipar
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LeaderboardTable({ data }: { data: any[] }) {
  return (
    <div className="space-y-3">
      {data.map((user, index) => (
        <div
          key={index}
          className={`flex items-center p-4 rounded-lg ${
            user.rank <= 3
              ? 'bg-amber-50 border border-amber-200'
              : 'bg-card border border-gray-200'
          }`}
        >
          <div className="flex items-center gap-4 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                user.rank === 1
                  ? 'bg-yellow-400 text-yellow-900'
                  : user.rank === 2
                  ? 'bg-gray-300 text-gray-700'
                  : user.rank === 3
                  ? 'bg-amber-700 text-amber-100'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {user.rank}
            </div>

            <Avatar>
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div>
              <p className="font-medium">{user.username}</p>
            </div>
          </div>

          <div className="font-bold">{user.score} pts</div>
        </div>
      ))}
    </div>
  );
}
