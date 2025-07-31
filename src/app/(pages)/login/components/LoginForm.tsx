'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { loginService } from '@/app/services/loginService';
import { handleError } from '@/app/utils/errorHandler';
import { toast } from 'react-toastify';
import Logo from '@/app/components/logo';

export default function LoginPage() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFetching(true);
    try {
      const { username } = await loginService.login({ username: user, password });
      toast.success('Inicio de sesión exitoso');

      // Esperar un poco para asegurar que las cookies se hayan establecido
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Forzar recarga para asegurar sincronización
      window.location.href = `/${username}/topics`;
    } catch (error) {
      handleError(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    // router.push('/topics');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          {Array.from({ length: 20 }).map(() => (
            <motion.div
              key={crypto.randomUUID()}
              className="absolute rounded-full bg-white"
              initial={{
                opacity: Math.random() * 0.5 + 0.3,
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [null, '-20%'],
                x: [null, Math.random() * 10 - 5 + '%'],
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
              style={{
                width: Math.random() * 30 + 10,
                height: Math.random() * 30 + 10,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-1 cursor-default">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
              className="mx-auto"
            >
              <Logo size="lg" animated={true} showTagline={true} />
            </motion.div>
            <CardDescription className="text-center text-md font-bold text-cyan-700">
              Inicia sesión para comenzar a jugar
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="user">Username</Label>
                <Input
                  id="user"
                  type="text"
                  placeholder="flashcards_master"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  required
                  className="border-cyan-200 focus:border-cyan-400"
                />
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link
                    href="/#"
                    className="text-xs text-cyan-600 hover:text-cyan-800 transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-cyan-200 focus:border-cyan-400"
                />
              </motion.div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full"
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-400 to-cyan-600 hover:from-teal-500 hover:to-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                  disabled={isFetching}
                >
                  Iniciar Sesión
                </Button>
              </motion.div>

              <div className="relative w-full flex items-center gap-2 my-2 cursor-default">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="text-xs text-gray-500">o continúa con</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="w-full"
              >
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-cyan-200 hover:bg-cyan-50 transition-all duration-300  "
                  onClick={handleGoogleLogin}
                  disabled
                >
                  <FaGoogle className="mr-2 h-4 w-4 text-red-500" />
                  Continuar con Google
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-center text-sm cursor-default"
              >
                ¿No tienes una cuenta?{' '}
                <Link
                  href="/register"
                  className="text-cyan-600 hover:text-cyan-800 font-medium transition-colors"
                >
                  Regístrate
                </Link>
              </motion.div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
