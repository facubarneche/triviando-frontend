'use client';

import { Button } from '@/app/components/ui/button';
import { CardContent, CardFooter } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

const FormRegister = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //TODO: Manejo logica registracion por inputs
    console.log('Register with:', username, email, password);
    router.push('/topics');
  };

  const handleGoogleRegister = () => {
    //TODO: Manejo logica Google registration
    console.log('Register with Google');
    router.push('/topics');
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <Label htmlFor="username" data-testid="username">
            Nombre de usuario
          </Label>
          <Input
            id="username"
            placeholder="quizmaster123"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border-cyan-200 focus:border-cyan-400"
          />
        </motion.div>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-cyan-200 focus:border-cyan-400"
          />
        </motion.div>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-2"
        >
          <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="border-cyan-200 focus:border-cyan-400"
          />
        </motion.div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full"
        >
          <Button
            type="submit"
            className="w-full bg-teal-400 shadow-md hover:shadow-lg text-white font-bold"
          >
            Crear Cuenta
          </Button>
        </motion.div>

        <div className="relative w-full flex items-center gap-2 my-2">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-xs text-gray-500">o continúa con</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full"
        >
          <Button
            type="button"
            variant="outline"
            className="w-full border-cyan-200 hover:bg-cyan-50 transition-all duration-300"
            onClick={handleGoogleRegister}
          >
            <FaGoogle className="mr-2 h-4 w-4 text-red-500" />
            Continuar con Google
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm"
        >
          ¿Ya tienes una cuenta?{' '}
          <Link
            href="/"
            className="text-cyan-600 hover:text-cyan-800 font-medium transition-colors"
          >
            Iniciar sesión
          </Link>
        </motion.div>
      </CardFooter>
    </form>
  );
};

export default FormRegister;
