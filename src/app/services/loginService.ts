import Cookies from 'js-cookie';
import { LoginCredentials, Usuario } from '../domain/User';
import { BaseService } from './baseService';
import { useUserStore } from '../stores/userStore';
import { cloudinaryAvatarService } from './cloudinaryAvatarService';
import { getUserInfoFromToken, isTokenExpired } from '../security/jwtUtils';
import { userService } from './userService';

interface LoginResponse {
  token: string;
}

class LoginService extends BaseService {
  async login(credentials: LoginCredentials): Promise<Usuario> {
    // El backend devuelve un objeto con la propiedad token
    const { data } = await this.axiosService.post<LoginResponse>(`/users/login`, credentials);
    const token = data.token;

    // Guardar token en cookie con nombre estándar
    Cookies.set('token', token, {
      expires: 1,
      path: '/',
      sameSite: 'lax',
    });

    // Extraer información básica del usuario desde el token JWT
    const userInfo = getUserInfoFromToken(token);
    if (!userInfo) {
      throw new Error('Token JWT inválido recibido del servidor');
    }

    // Obtener datos completos del usuario desde el backend
    let userData;
    try {
      userData = await userService.getUserById(userInfo.id);
    } catch (error) {
      console.error('Error obteniendo datos completos del usuario:', error);
      // Fallback: crear objeto básico con info del token
      userData = {
        id: userInfo.id,
        name: userInfo.fullname.split(' ')[0] || userInfo.fullname,
        lastName: userInfo.fullname.split(' ').slice(1).join(' ') || '',
        username: userInfo.username,
        email: '', // No disponible en el token
        phoneNumber: '',
        countryCode: '',
        birthDate: '',
        joinDate: '',
        age: 0,
      };
    }

    // Crear objeto Usuario compatible con la interfaz existente
    const user: Usuario = {
      id: userData.id,
      name: userData.name,
      lastName: userData.lastName,
      username: userData.username,
      email: userData.email,
      account: userInfo.account,
      token: token,
      avatar: userData.avatar,
    };

    // Guardar en Zustand store
    useUserStore.getState().setUser(user);

    // Buscar avatar del usuario en Cloudinary después del login si no lo tiene ya
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
  }

  logout() {
    Cookies.remove('token');
    // Limpiar Zustand store
    useUserStore.getState().clearUser();
  }

  getUsuarioActual(): Usuario | null {
    // Primero intentar obtener del store de Zustand
    const userFromStore = useUserStore.getState().user;
    if (userFromStore) {
      return userFromStore;
    }

    // Fallback: obtener de token JWT y sincronizar con store
    const token = Cookies.get('token');
    if (!token) {
      return null;
    }

    // Extraer información del usuario desde el token
    const userInfo = getUserInfoFromToken(token);
    if (!userInfo) {
      // Token inválido o expirado, limpiarlo
      Cookies.remove('token');
      return null;
    }

    // Intentar obtener datos completos del usuario de forma asíncrona
    // Pero devolver la info básica inmediatamente
    const basicUser: Usuario = {
      id: userInfo.id,
      name: userInfo.fullname.split(' ')[0] || userInfo.fullname,
      lastName: userInfo.fullname.split(' ').slice(1).join(' ') || '',
      username: userInfo.username,
      account: userInfo.account,
      token: token,
    };

    // Sincronizar con store con info básica
    useUserStore.getState().setUser(basicUser);

    // Obtener datos completos en background y actualizar store
    userService
      .getUserById(userInfo.id)
      .then((userData) => {
        const fullUser: Usuario = {
          ...basicUser,
          name: userData.name,
          lastName: userData.lastName,
          email: userData.email,
          avatar: userData.avatar,
        };
        useUserStore.getState().setUser(fullUser);
      })
      .catch((error) => {
        console.error('Error obteniendo datos completos del usuario:', error);
      });

    return basicUser;
  }

  isAuthenticated(): boolean {
    // Verificar en store primero
    const storeAuth = useUserStore.getState().isAuthenticated;

    // Verificar token en cookie
    const token = Cookies.get('token');
    if (!token) {
      // No hay token, no está autenticado
      if (storeAuth) {
        // Limpiar store si está desincronizado
        useUserStore.getState().clearUser();
      }
      return false;
    }

    // Verificar si el token es válido y no ha expirado
    const tokenValid = !isTokenExpired(token);

    if (!tokenValid) {
      // Token expirado, limpiar todo
      Cookies.remove('token');
      useUserStore.getState().clearUser();
      return false;
    }

    // Si el token es válido pero el store no está sincronizado, sincronizarlo
    if (!storeAuth) {
      const userInfo = getUserInfoFromToken(token);
      if (userInfo) {
        const user: Usuario = {
          id: userInfo.id,
          name: userInfo.fullname.split(' ')[0] || userInfo.fullname,
          lastName: userInfo.fullname.split(' ').slice(1).join(' ') || '',
          username: userInfo.username,
          account: userInfo.account,
          token: token,
        };
        useUserStore.getState().setUser(user);
      }
    }

    return tokenValid;
  }

  getUserId(): number {
    const usuario = this.getUsuarioActual();
    if (usuario) {
      return usuario.id;
    }
    throw new Error('No se encontró el ID del usuario');
  }
}

export const loginService = new LoginService();
