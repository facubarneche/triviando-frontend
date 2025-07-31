import Cookies from 'js-cookie';
import { LoginCredentials, Usuario } from '../domain/User';
import { BaseService } from './baseService';
import { useUserStore } from '../stores/userStore';
import { cloudinaryAvatarService } from './cloudinaryAvatarService';

class LoginService extends BaseService {
  async login(credentials: LoginCredentials): Promise<Usuario> {
    const { data: user } = await this.axiosService.post<Usuario>(`/users/login`, credentials);

    // Guardar en cookie (mantener compatibilidad) con configuración más específica
    Cookies.set('usuario', JSON.stringify(user), {
      expires: 1,
      path: '/',
      sameSite: 'lax',
    });

    // Guardar en Zustand store
    useUserStore.getState().setUser(user);

    // Buscar avatar del usuario en Cloudinary después del login
    try {
      const avatar = await cloudinaryAvatarService.getCurrentUserAvatar();
      if (avatar) {
        useUserStore.getState().setAvatar(avatar);
      }
    } catch {
      // Avatar fetch failed, continue without avatar
    }

    return user;
  }

  logout() {
    Cookies.remove('usuario');
    // Limpiar Zustand store
    useUserStore.getState().clearUser();
  }

  getUsuarioActual(): Usuario | null {
    // Primero intentar obtener del store de Zustand
    const userFromStore = useUserStore.getState().user;
    if (userFromStore) {
      return userFromStore;
    }

    // Fallback: obtener de cookie y sincronizar con store
    const usuario = Cookies.get('usuario');
    if (usuario) {
      const parsedUser = JSON.parse(usuario);
      useUserStore.getState().setUser(parsedUser);
      return parsedUser;
    }

    return null;
  }

  isAuthenticated(): boolean {
    // Verificar tanto en store como en cookie
    const storeAuth = useUserStore.getState().isAuthenticated;
    const cookieAuth = !!Cookies.get('usuario');

    // Si hay discrepancia, sincronizar
    if (cookieAuth && !storeAuth) {
      const usuario = Cookies.get('usuario');
      if (usuario) {
        useUserStore.getState().setUser(JSON.parse(usuario));
      }
    }

    return storeAuth || cookieAuth;
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
