import { Button } from '@/app/components/ui/button';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

const Header = () => (
  <header className="p-4 flex justify-between items-center">
    <motion.h1
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="text-2xl font-bold text-white"
    >
      Elige un Tema
    </motion.h1>
    <div className="flex gap-2">
      <Button variant="ghost" className="text-white hover:bg-white/20" asChild>
        <Link href="/profile">Perfil</Link>
      </Button>
      <Button variant="ghost" className="text-white hover:bg-white/20" asChild>
        <Link href="/leaderboard">Ranking</Link>
      </Button>
      <Button variant="ghost" className="text-white hover:bg-white/20">
        <LogOut className="h-4 w-4 mr-2" />
        Salir
      </Button>
    </div>
  </header>
);

export default Header;
