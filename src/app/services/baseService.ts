import axios, { AxiosInstance } from 'axios';
import { parseCookies } from 'nookies';

export class BaseService {
  protected readonly axiosService: AxiosInstance;

  constructor() {
    const baseURL = this.getBaseURL();

    this.axiosService = axios.create({
      baseURL,
      withCredentials: true, // por si usás cookies HttpOnly
    });

    // Interceptor para agregar el token dinámicamente en cada request
    this.axiosService.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
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
    const token = cookies['token'];

    if (!token) return null;

    return token;
  }
}
