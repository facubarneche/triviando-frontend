import { toast } from 'react-toastify';
import axios from 'axios';

export function handleError(error: unknown): void {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    switch (status) {
      case 400:
        toast.error(message || 'Petición incorrecta');
        break;
      case 401:
        toast.error(message || 'No autorizado. Verificá tus credenciales.');
        break;
      case 403:
        toast.error(message || 'Acceso prohibido');
        break;
      case 404:
        toast.error(message || 'Recurso no encontrado');
        break;
      case 500:
        toast.error(message || 'Error interno del servidor');
        break;
      default:
        toast.error(message || 'Error desconocido');
        break;
    }
    return;
  }

  toast.error('Error de conexión. Reintentá más tarde.');
}
