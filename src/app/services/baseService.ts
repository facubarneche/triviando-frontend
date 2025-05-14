import axios, { AxiosInstance } from 'axios';

export class BaseService {
  protected readonly axiosService: AxiosInstance;

  constructor() {
    const baseURL = this.getBaseURL();
    this.axiosService = axios.create({ baseURL });
  }

  private getBaseURL() {
    const DEFAULT_API_URL = 'http://localhost:8080';

    const isServer = typeof window === 'undefined';

    const host = isServer
      ? process.env.API_URL_SERVER ?? DEFAULT_API_URL
      : process.env.NEXT_PUBLIC_API_URL_CLIENT ?? DEFAULT_API_URL;

    return `${host}/api/v1`;
  }
}
