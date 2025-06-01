import axios from 'axios';
import { BaseService } from './baseService';

interface IUser {
  username: string;
  email: string;
  password: string;
}
class UserService extends BaseService {
  createUser = async ({ username, email, password }: IUser) => {
    try {
      const { data } = await this.axiosService.post('/users', {
        username: username,
        email: email,
        password: password,
      });

      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Registro fallido');
    }
  };

  getUserById = async (userId: number) => {
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
}

export const userService = new UserService();
