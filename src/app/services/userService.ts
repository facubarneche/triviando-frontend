import axios from 'axios';
import { BaseService } from './baseService';
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

      // Solo retornar los datos, no manejar cookies aquí
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

        // Crear el objeto usuario para el store (compatible con la interfaz Usuario)
        const userForStore = {
          id: updatedUser.id,
          name: updatedUser.name,
          lastName: updatedUser.lastName,
          username: updatedUser.username,
          avatar: updatedUser.avatar,
          // El token se mantiene en el store desde el login
        };

        // Actualizar el store de Zustand con los datos actualizados
        useUserStore.getState().setUser({
          ...useUserStore.getState().user!,
          ...userForStore,
        });
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
