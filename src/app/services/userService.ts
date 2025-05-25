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
        //! Deberiamos Definir contrato, actualmente se pide username, email y pass (a futuro estaria bueno pedir el resto de datos, hoy van hardcodeados)
        // TODO: Agregar campos para satisfacer al back o el back baja requerimientos
        fullName: username, // Lo usaremos como username
        email: email,
        password: password,
        age: 30,
        phoneNumber: '+54 11 1234 5678',
        birthDate: '1995-07-15',
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
