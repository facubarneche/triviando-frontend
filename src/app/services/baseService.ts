import axios, { AxiosInstance } from 'axios';

export class BaseService {
  protected readonly axiosService: AxiosInstance;

  constructor() {
    const baseURL = this.getBaseURL();
    this.axiosService = axios.create({ baseURL });
  }

  private getBaseURL() {
    if (typeof window === 'undefined') {
      // SSR
      return 'http://proyecto2025-be-app:8080/api/v1';
    } else {
      // CSR
      return 'http://localhost:8080/api/v1';
    }
  }
}
