import axios from 'axios';
import { BaseService } from './baseService';
import Cookies from 'js-cookie';
import { useUserStore } from '../stores/userStore';

interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IUserData {
  id: number;
  name: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  birthDate: string;
  joinDate: string;
  age: number;
  avatar?: string; // Cloudinary public_id for the avatar image
}

export interface IUpdateUserData {
  id: number;
  name: string;
  lastName: string;
  username: string;
  email: string;
  birthDate: string; // ISO: YYYY-MM-DD
  phoneNumber: string;
  countryCode: string;
  currentPassword: string;
  avatar?: string; // Cloudinary public_id for the avatar image
}

class UserService extends BaseService {
  createUser = async ({ username, email, password }: IUser) => {
    try {
      const { data } = await this.axiosService.post('/users', { username, email, password });

      //Esta cookie expira en 1 día
      Cookies.set('usuario', JSON.stringify(data), { expires: 1 });

      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Registro fallido');
    }
  };

  getUserById = async (userId: number): Promise<IUserData> => {
    try {
      const { data } = await this.axiosService.get(`/users/${userId}`);

      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Error al obtener el usuario');
    }
  };

  editUserById = async (userData: Partial<IUpdateUserData>) => {
    try {
      const { data } = await this.axiosService.put(`/users`, userData);

      // Obtener los datos actualizados del servidor para asegurar consistencia
      if (userData.id) {
        const updatedUser = await this.getUserById(userData.id);

        // Obtener el token de la cookie actual para preservarlo
        const currentCookie = Cookies.get('usuario');
        let currentToken = null;
        if (currentCookie) {
          try {
            const currentUser = JSON.parse(currentCookie);
            currentToken = currentUser.token;
          } catch (error) {
            console.error('Error parsing current cookie:', error);
          }
        }

        // Crear el objeto usuario para la cookie (mismo formato que en login)
        const userForCookie = {
          id: updatedUser.id,
          name: updatedUser.name,
          lastName: updatedUser.lastName,
          username: updatedUser.username,
          avatar: updatedUser.avatar,
          token: currentToken, // Preservar el token
        };

        // Actualizar la cookie con la misma configuración que en login
        Cookies.set('usuario', JSON.stringify(userForCookie), {
          expires: 1,
          path: '/',
          sameSite: 'lax',
        });

        // Actualizar el store de Zustand también
        useUserStore.getState().setUser(userForCookie);
      }

      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Error al editar el usuario');
    }
  };

  getUserRegisterDate = async (userId: number) => {
    try {
      const { data } = await this.axiosService.get(`/users/${userId}/register-date`);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Error al obtener la fecha de registro del usuario');
    }
  };

  getUserStatistics = async (userId: number) => {
    try {
      const { data } = await this.axiosService.get(`/users/statistics/${userId}`);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Error al obtener las estadísticas del usuario');
    }
  };

  getStreak = async (userId: number) => {
    try {
      const { data } = await this.axiosService.get(`/users/racha/${userId}`);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Error al obtener la racha del usuario');
    }
  };

  uploadAvatar = async (userId: number, publicId: string) => {
    try {
      const { data } = await this.axiosService.put(`/users/${userId}/avatar`, {
        avatar: publicId,
      });
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Error al actualizar el avatar');
    }
  };
}

export const userService = new UserService();
