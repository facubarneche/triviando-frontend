import axios from 'axios';
import Cookies from 'js-cookie';
import { LoginCredentials, Usuario } from '../domain/User';
import env from '../utils/env';

export const loginService = {
  login,
  logout,
  getUsuarioActual,
  isAuthenticated,
};

async function login(credentials: LoginCredentials): Promise<Usuario> {
  const response = await axios.post<Usuario>(`${env.baseURL}/api/v1/users/login`, credentials);
  const user = response.data;
  console.log('Usuario logueado:', response);
  //Esta cookie expira en 1 día
  Cookies.set('usuario', JSON.stringify(user), { expires: 1 });
  return user;
}

function logout() {
  Cookies.remove('usuario');
}

function getUsuarioActual(): Usuario | null {
  const usuario = Cookies.get('usuario');
  return usuario ? JSON.parse(usuario) : null;
}

function isAuthenticated(): boolean {
  return !!Cookies.get('usuario');
}
