'use client';

import { Button } from '@/app/components/ui/button';
import { CardContent, CardFooter } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import AnimatedContainer from '@/app/components/AnimatedContainer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { formRegisterSchema } from '@/app/schemas/formRegisterSchema';
import { userService } from '@/app/services/userService';
import { toast } from 'react-toastify';
import { useState } from 'react';

type FormData = z.infer<typeof formRegisterSchema>;

const FormRegister = () => {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formRegisterSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsFetching(true);
      // Usar userService.createUser que ahora maneja cookies, tokens y contexto automáticamente
      const user = await userService.createUser({ ...data });
      toast.success('Registro exitoso');
      // Redirigir usando el username del usuario registrado
      router.push(`/${user.username}/topics`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error(e.message ?? 'Falló el registro');
    } finally {
      setIsFetching(false);
    }
  };

  // const handleGoogleRegister = () => {
  //   console.log('Register with Google');
  //   //TODO: Implementar validacion con google cuando corresponda
  //   router.push(`/${username}/topics`);
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        <AnimatedContainer animation="slideRight" delay={0.2} className="space-y-2">
          <Label htmlFor="username">Nombre de usuario</Label>
          <Input
            id="username"
            placeholder="triviandoMaster"
            {...register('username')}
            className="border-cyan-200 focus:border-cyan-400"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </AnimatedContainer>

        <AnimatedContainer animation="slideRight" delay={0.3} className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="triviando@email.com"
            {...register('email')}
            className="border-cyan-200 focus:border-cyan-400"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </AnimatedContainer>

        <AnimatedContainer animation="slideRight" delay={0.4} className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            {...register('password')}
            className="border-cyan-200 focus:border-cyan-400"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </AnimatedContainer>

        <AnimatedContainer animation="slideRight" delay={0.5} className="space-y-2">
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
        </AnimatedContainer>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4">
        <AnimatedContainer animation="slideUp" delay={0.6} className="w-full">
          <div className="mb-4">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1"
                {...register('termsAndPolicy')}
                data-testid="terms-checkbox"
              />
              <span className="text-sm text-gray-700">
                Acepto los{' '}
                <Link href="/terms" className="text-blue-600 underline">
                  Términos de uso
                </Link>{' '}
                y la{' '}
                <Link href="/policy" className="text-blue-600 underline">
                  Política de conducta
                </Link>
              </span>
            </label>
            {errors.termsAndPolicy && (
              <p className="text-red-500 text-sm">{errors.termsAndPolicy.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-teal-400 shadow-md hover:shadow-lg text-white font-bold cursor-pointer"
            disabled={isFetching}
          >
            Crear Cuenta
          </Button>
        </AnimatedContainer>

        <div className="relative w-full flex items-center gap-2 my-2 cursor-default">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-xs text-gray-500">o continúa con</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <AnimatedContainer animation="slideUp" delay={0.7} className="w-full">
          <Button
            type="button"
            variant="outline"
            className="w-full border-cyan-200 hover:bg-cyan-50 transition-all duration-300 cursor-pointer"
            disabled
          >
            <FaGoogle className="mr-2 h-4 w-4 text-red-500" />
            Continuar con Google
          </Button>
        </AnimatedContainer>

        <AnimatedContainer
          animation="fade"
          delay={0.8}
          className="text-center text-sm cursor-default text-gray-700"
        >
          ¿Ya tienes una cuenta?{' '}
          <Link
            href="/login"
            className="text-cyan-600 hover:text-cyan-800 font-medium transition-colors"
          >
            Iniciar sesión
          </Link>
        </AnimatedContainer>
      </CardFooter>
    </form>
  );
};

export default FormRegister;
