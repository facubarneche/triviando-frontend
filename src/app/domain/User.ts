//Request para iniciar sesión
export interface LoginCredentials {
  email: string;
  password: string;
}

//Respuesta del servidor al iniciar sesión
export interface Usuario {
  id: number;
  name: string;
  username: string;
}
