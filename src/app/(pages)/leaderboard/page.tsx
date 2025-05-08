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

  const leaderBoardData = await leaderBoardService.getHistoricalRanking(props);
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-700">
      <div className="mx-2 md:mx-15">
        <Header />
        <Card leaderBoardData={leaderBoardData} />
      </div>
    </div>
  );
};

export default Leaderboard;
