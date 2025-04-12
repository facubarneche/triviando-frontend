import { BaseService } from './baseService';

interface IUser {
  username: string;
  email: string;
  password: string;
}
class UserService extends BaseService {
  createUser = async ({ username, email, password }: IUser) => {
    const { data } = await this.axiosService.post('/api/v1/users', {
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
  };
}

// Aquí estás inicializando la instancia correctamente
export const userService = new UserService();
