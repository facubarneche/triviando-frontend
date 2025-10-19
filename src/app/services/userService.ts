import axios from 'axios';
import Cookies from 'js-cookie';
import { BaseService } from './baseService';
import { useUserStore } from '../stores/userStore';
import { getUserInfoFromToken } from '../security/jwtUtils';
import { cloudinaryAvatarService } from './cloudinaryAvatarService';
import type { AccountType, Usuario } from '../domain/User';

interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IUserData {
  id: number;
  account: AccountType;
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
  createUser = async ({ username, email, password }: IUser): Promise<Usuario> => {
    try {
      // El backend devuelve un objeto con el token
      const { data } = await this.axiosService.post('/users', { username, email, password });
      const token = data.token;

      if (!token) {
        throw new Error('No se recibió token del servidor');
      }

      // Guardar token en cookie
      Cookies.set('token', token, {
        expires: 1,
        path: '/',
        sameSite: 'lax',
      });

      // Extraer información del usuario desde el token JWT
      const userInfo = getUserInfoFromToken(token);
      if (!userInfo) {
        throw new Error('Token JWT inválido recibido del servidor');
      }

      // Obtener datos completos del usuario desde el backend
      let fullUserData;
      try {
        fullUserData = await this.getUserById(userInfo.id);
      } catch (error) {
        console.error('Error obteniendo datos completos del usuario:', error);
        // Fallback: crear objeto básico con info del token
        fullUserData = {
          id: userInfo.id,
          name: userInfo.fullname.split(' ')[0] || userInfo.fullname,
          lastName: userInfo.fullname.split(' ').slice(1).join(' ') || '',
          username: userInfo.username,
          email: email, // Usar el email del registro
          phoneNumber: '',
          countryCode: '',
          birthDate: '',
          joinDate: '',
          age: 0,
        };
      }

      // Crear objeto Usuario compatible con Zustand
      const user: Usuario = {
        id: fullUserData.id,
        name: fullUserData.name,
        lastName: fullUserData.lastName,
        username: fullUserData.username,
        email: fullUserData.email,
        account: userInfo.account,
        token: token,
        avatar: fullUserData.avatar,
      };

      // Guardar en Zustand store
      useUserStore.getState().setUser(user);

      // Buscar avatar del usuario en Cloudinary después del registro
      if (!user.avatar) {
        try {
          const avatar = await cloudinaryAvatarService.getCurrentUserAvatar();
          if (avatar) {
            useUserStore.getState().setAvatar(avatar);
          }
        } catch {
          // Avatar fetch failed, continue without avatar
        }
      }

      return user;
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
