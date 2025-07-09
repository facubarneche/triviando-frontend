import Card from './components/Card';
import Header from './components/Header';
import { leaderBoardService } from '@/app/services/leaderBoardService';
import { getProp, parseLeaderboardData } from './utils/helpers';
import { cookies } from 'next/headers';

interface LeaderBoardProps {
  searchParams: Promise<{ page: number }>;
}
const Leaderboard = async ({ searchParams }: LeaderBoardProps) => {
  const { page } = await searchParams;
  const props = await getProp(page);
  const cookieStore = await cookies();
  const usuarioCookie = cookieStore.get('usuario')?.value;

  const parsed = JSON.parse(usuarioCookie as string);
  const token = parsed.token ?? '';

  //TODO: crear un componente para acceso denegado
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-700">
        <div className="mx-2 md:mx-15">
          <Header />
          <div className="text-white text-center mt-10">
            <h1 className="text-2xl font-bold">Acceso Denegado</h1>
            <p>Por favor, inicia sesión para ver el ranking.</p>
          </div>
        </div>
      </div>
    );
  }

  const [historical, weekly] = await Promise.all([
    leaderBoardService.getHistoricalRanking({ ...props, token }),
    leaderBoardService.getWeeklyRanking({ ...props, token }),
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
