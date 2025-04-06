import axios from 'axios';
import { LoginCredentials, Usuario } from '../domain/User';


export const loginService = {
  login,
  logout,
  getUser,
  isAuthenticated,
};

async function login(credentials: LoginCredentials): Promise<Usuario> {
  try {
    const response = await axios.post<Usuario>(env, credentials);
    const user = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
}

function logout() {
  localStorage.removeItem('user');
}

function getUser(): Usuario | null {
  const stored = localStorage.getItem('user');
  return stored ? JSON.parse(stored) : null;
}

function isAuthenticated(): boolean {
  return !!localStorage.getItem('user');
}
