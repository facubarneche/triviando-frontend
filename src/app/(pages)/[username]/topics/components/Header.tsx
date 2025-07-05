'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import { Trophy, LogOut, User, ChevronDown, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { loginService } from '@/app/services/loginService';
import { useUserStore } from '@/app/stores/userStore';
import { useInitializeUser } from '@/app/hooks/useInitializeUser';

const Header = () => {
  const router = useRouter();
  const { username } = useParams<{ username: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Inicializar usuario desde cookies si es necesario
  useInitializeUser();

  // Obtener datos del usuario desde Zustand
  const { user } = useUserStore();

  // Usar datos del store o fallback a datos por defecto
  const userData = user || {
    name: 'Usuario',
    lastName: 'Invitado',
    username: username || 'guest',
    id: 0,
  };

  const fullName = `${userData.name} ${userData.lastName}`;

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    loginService.logout();
    setIsOpen(false);
    router.push('/login');
  };

  const handleProfile = () => {
    setIsOpen(false);
    router.push(`/${username}/profile`);
  };

  const handleLeaderboard = () => {
    router.push(`/${username}/leaderboard`);
  };

  const handleSubscription = () => {
    setIsOpen(false);
    router.push(`/${username}/subscription`);
  };

  return (
    <header className="p-4 flex flex-col md:flex-row-reverse gap-4 justify-between">
      <div className="flex items-center gap-4 justify-end">
        {/* Botón de ranking */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={handleLeaderboard}
          >
            <Trophy className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Menú de usuario */}
        <div className="relative" ref={dropdownRef}>
          <Button
            variant="ghost"
            className="relative h-10 w-auto pl-2 pr-3 flex items-center gap-2 text-white hover:bg-white/20 rounded-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Avatar className="h-8 w-8 border-2 border-white/30">
              <AvatarImage src={'/placeholder-user.jpg'} alt={username} />
              <AvatarFallback className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white text-sm">
                {userData.name.charAt(0) + userData.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline-block font-medium text-sm">{userData.username}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="h-4 w-4 opacity-70" />
            </motion.div>
          </Button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-56 sm:w-56 xs:w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 
                         sm:max-w-none max-w-[280px] min-w-[260px]"
              >
                {/* Header del usuario */}
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900 truncate">{fullName}</p>
                  <p className="text-xs text-gray-500 truncate">@{userData.username}</p>
                </div>

                {/* Opciones del menú */}
                <div className="py-2">
                  <button
                    onClick={handleProfile}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <User className="mr-3 h-4 w-4 text-teal-500" />
                    Perfil
                  </button>
                  <button
                    onClick={handleSubscription}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Crown className="mr-3 h-4 w-4 text-cyan-500" />
                    Suscripción
                  </button>
                </div>

                {/* Separador */}
                <div className="border-t border-gray-200 my-1"></div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Cerrar Sesión
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex justify-center md:justify-start">
        <img
          src="/logo-triviando.png"
          alt="trivIAndo"
          className="h-8 md:h-10 filter brightness-0 invert"
        />
      </div>
    </header>
  );
};

export default Header;
