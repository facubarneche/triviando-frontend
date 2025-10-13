//Request para iniciar sesión
export interface LoginCredentials {
  username: string;
  password: string;
}

//Respuesta del servidor al iniciar sesión
export interface Usuario {
  id: number;
  lastName: string;
  name: string;
  username: string;
  email?: string; // Email del usuario
  joinDate?: string; // Fecha de registro
  account?: AccountType; // Tipo de cuenta
  avatar?: string; // Cloudinary public_id for the avatar image
  token?: string; // JWT token para autenticación
}

export type AccountType = 'FREE' | 'PREMIUM';
