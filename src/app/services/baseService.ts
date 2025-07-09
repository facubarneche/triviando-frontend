import axios, { AxiosInstance } from 'axios';
import { parseCookies } from 'nookies';

export class BaseService {
  protected readonly axiosService: AxiosInstance;

  constructor() {
    const baseURL = this.getBaseURL();
    const token = this.getToken();

    this.axiosService = axios.create({
      baseURL,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      withCredentials: true, // por si usás cookies HttpOnly
    });
  }

  private getBaseURL() {
    const DEFAULT_API_URL = 'http://localhost:8080';

    const isServer = typeof window === 'undefined';

    const host = isServer
      ? process.env.API_URL_SERVER ?? DEFAULT_API_URL
      : process.env.NEXT_PUBLIC_API_URL_CLIENT ?? DEFAULT_API_URL;

    return `${host}/api/v1`;
  }

  private getToken(): string | null {
    // parseCookies es compatible tanto con CSR como com SSR
    const cookies = parseCookies();
    const userData = cookies['usuario'];

    if (!userData) return null;

    try {
      const parsed = JSON.parse(userData);
      return parsed.token ?? null;
    } catch (e) {
      console.error('Error al parsear la cookie usuario', e);
      return null;
    }
  }
}
