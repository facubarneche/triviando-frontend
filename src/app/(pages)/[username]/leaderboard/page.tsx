import Card from './components/Card';
import Header from './components/Header';
import { leaderBoardService } from '@/app/services/leaderBoardService';
import { getProp, parseLeaderboardData } from './utils/helpers';

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

  // Obtener avatares de Cloudinary para ambos rankings
  const [historicalData, weeklyData] = await Promise.all([
    parseLeaderboardData(historical.content),
    parseLeaderboardData(weekly.content),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-700">
      <div className="mx-2 md:mx-15">
        <Header />
        <Card
          historical={{ ...historical, content: historicalData }}
          weekly={{ ...weekly, content: weeklyData }}
        />
      </div>
    </div>
  );
};

export default Leaderboard;
