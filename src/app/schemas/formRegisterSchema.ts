import { z } from 'zod';

export const formRegisterSchema = z
  .object({
    username: z.string().min(3, 'Debe tener al menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas deben coincidir',
    path: ['confirmPassword'],
  });
