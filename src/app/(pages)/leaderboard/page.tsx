import Card from './components/Card';
import Header from './components/Header';
import { leaderBoardService } from '@/app/services/leaderBoardService';
import { parseLeaderboardData } from './utils/helpers';

const Leaderboard = async () => {
  const { content } = await leaderBoardService.getHistoricalRanking(1);
  const historicalData = parseLeaderboardData(content);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-700">
      <div className="mx-2 md:mx-15">
        <Header />
        <Card historicalData={historicalData} />
      </div>
    </div>
  );
};

export default Leaderboard;
