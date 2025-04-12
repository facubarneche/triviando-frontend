/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/app/components/ui/button';
import { CardContent, CardFooter } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { formRegisterSchema } from '@/app/schemas/formRegisterSchema';
import { userService } from '@/app/services/userService';

type FormData = z.infer<typeof formRegisterSchema>;

const FormRegister = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formRegisterSchema),
  });

  const onSubmit = (data: FormData) => {
    //TODO: Enviar data backend
    try {
      userService.createUser({ ...data });
      router.push('/topics');
    } catch (e: any) {
      console.error(e);
      //TODO: Agregar toast cuando mergee guarain
    }
  };

  const handleGoogleRegister = () => {
    console.log('Register with Google');
    //TODO: Implementar validacion con google cuando corresponda
    router.push('/topics');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <Label htmlFor="username">Nombre de usuario</Label>
          <Input
            id="username"
            placeholder="flashcardsMaster"
            {...register('username')}
            className="border-cyan-200 focus:border-cyan-400"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
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
            placeholder="flashcardsMaster@email.com"
            {...register('email')}
            className="border-cyan-200 focus:border-cyan-400"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
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
            {...register('password')}
            className="border-cyan-200 focus:border-cyan-400"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-2"
        >
          <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            className="border-cyan-200 focus:border-cyan-400"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}
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
