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
  avatar?: string; // Cloudinary public_id for the avatar image
  token?: string; // JWT token para autenticación
}
