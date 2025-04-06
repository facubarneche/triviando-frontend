import { Button } from '@/app/components/ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

const Header = () => (
  <header className="p-4 flex flex-col md:flex-row-reverse gap-4 justify-between">
    <div className="flex justify-end">
      <Button variant="ghost" className="text-white hover:bg-white/20" asChild>
        <Link href="/profile">Perfil</Link>
      </Button>
      <Button variant="ghost" className="text-white hover:bg-white/20" asChild>
        <Link href="/leaderboard">Ranking</Link>
      </Button>
      <Button variant="ghost" className="text-white hover:bg-white/20">
        <LogOut className="h-4 w-4" />
        Salir
      </Button>
    </div>
    <h1 className="text-2xl font-bold text-white whitespace-nowrap text-center md:justify-start">
      Elige un Tema
    </h1>
  </header>
);

export default Header;
