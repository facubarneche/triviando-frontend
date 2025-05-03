import axios, { AxiosInstance } from 'axios';

export class BaseService {
  protected readonly axiosService: AxiosInstance;

  constructor(baseURL = 'http://localhost:8080/api/v1') {
    this.axiosService = axios.create({ baseURL });
  }
}
