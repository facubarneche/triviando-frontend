import Paginator from '@/app/components/paginator';
import Card from './components/Card';
import Header from './components/Header';

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-700">
      <div className="mx-2 md:mx-15">
        <Header />
        <Card />
        <Paginator totalPages={10} />
      </div>
    </div>
  );
}
