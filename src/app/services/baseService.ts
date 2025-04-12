import axios, { AxiosInstance } from 'axios';

export class BaseService {
  protected readonly axiosService: AxiosInstance;

  constructor(baseURL: string = process.env.API_BASE_URL!) {
    this.axiosService = axios.create({ baseURL });
  }
}
