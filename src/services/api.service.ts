import ApiClient from './api';
import type { Response } from '../models/response';
import type { AxiosInstance, AxiosResponse } from 'axios';

abstract class ApiService<T> {
  public service: AxiosInstance;
  constructor(public resource: string) {
    this.service = ApiClient;
  }

  getAll(params?: { [key: string]: any }): Promise<AxiosResponse<Response<T>>> {
    if (params) {
      return this.service.get(`${this.resource}`, { params });
    }
    return this.service.get(`${this.resource}`);
  }

  getResource(id: number|string, params?: { [key: string]: any }): Promise<AxiosResponse<T>> {
    if (params) {
      return this.service.get(`${this.resource}/${id}`, { params });
    }
    return this.service.get(`${this.resource}/${id}`);
  }

  create(payload: T): Promise<AxiosResponse<T>> {
    return this.service.post(`${this.resource}`, payload);
  }

  update(id: number, payload: T): Promise<AxiosResponse<T>> {
    return this.service.put(`${this.resource}/${id}`, payload);
  }

  remove(id: number): Promise<AxiosResponse<T>> {
    return this.service.delete(`${this.resource}/${id}`);
  }
}

export default ApiService;
