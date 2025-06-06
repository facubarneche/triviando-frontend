import Card from './components/Card';
import Header from './components/Header';
import { leaderBoardService } from '@/app/services/leaderBoardService';
import { getProp } from './utils/helpers';

interface LeaderBoardProps {
  searchParams: Promise<{ page: number }>;
}
const Leaderboard = async ({ searchParams }: LeaderBoardProps) => {
  const { page } = await searchParams;
  const props = await getProp(page);

  const [historical, weekly] = await Promise.all([
    leaderBoardService.getHistoricalRanking(props),
    leaderBoardService.getWeeklyRanking(props),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-700">
      <div className="mx-2 md:mx-15">
        <Header />
        <Card historical={historical} weekly={weekly} />
      </div>
    </div>
  );
};

export default Leaderboard;
