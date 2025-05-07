import Card from './components/Card';
import Header from './components/Header';
import { leaderBoardService } from '@/app/services/leaderBoardService';

interface LeaderBoardProps {
  searchParams: Promise<{ page: number }>;
}
const Leaderboard = async ({ searchParams }: LeaderBoardProps) => {
  const { page } = await searchParams;
  //TODO: Obtener id
  const leaderBoardData = await leaderBoardService.getHistoricalRanking({ page });
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
