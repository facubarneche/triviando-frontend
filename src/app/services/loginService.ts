import Cookies from 'js-cookie';
import { LoginCredentials, Usuario } from '../domain/User';
import { BaseService } from './baseService';

class LoginService extends BaseService {
  async login(credentials: LoginCredentials): Promise<Usuario> {
    const response = await this.axiosService.post<Usuario>(`/users/login`, credentials);
    const user = response.data;
    //Esta cookie expira en 1 día
    Cookies.set('usuario', JSON.stringify(user), { expires: 1 });
    return user;
  }

  logout() {
    Cookies.remove('usuario');
  }

  getUsuarioActual(): Usuario | null {
    const usuario = Cookies.get('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  isAuthenticated(): boolean {
    return !!Cookies.get('usuario');
  }
}

export const loginService = new LoginService();
