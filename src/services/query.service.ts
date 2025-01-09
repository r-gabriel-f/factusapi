import type { Ref } from 'vue';
import ApiService from './api.service';
import { useMutation, useQuery } from '@tanstack/vue-query';

abstract class QueryService<T> extends ApiService<T> {
  constructor(public resource: string, public key: string) {
    super(resource);
  }

  useListQuery(params?: Ref<{ [key: string]: any }>, options?: {
    //To make sure the query is refetched when the window regains focus, set refetchOnWindowFocus to true.
    refetchOnWindowFocus?: boolean | 'always';
    refetchOnMount?: boolean | 'always';
    retryOnMount?: boolean;
    enabled?: boolean
  })  {
    return useQuery({
      queryKey: [`${this.key}_list`, params?.value],
      queryFn: async () => {
        return await this.getAll(params?.value).then((res) => {
          return res.data;
        }).catch((err) => {
          throw err;
        });
      },
      ...options,
    });
  }

  useGetQuery(id: Ref<number>, params?: Ref<{ [key: string]: any }>, options?: {
    refetchOnWindowFocus?: boolean | 'always';
    refetchOnMount?: boolean | 'always';
    retryOnMount?: boolean;
    enabled?: boolean
  }) {
    return useQuery({
      queryKey: [`${this.key}_get`, id],
      queryFn: () => {
        return this.getResource(id.value, params?.value);
      },
      ...options,
    });
  }

  useCreateMutation() {
    return useMutation({
      mutationKey: [`${this.key}_create`],
      mutationFn: async (payload: T) => {
        return await this.create(payload).then((res) => {
          return res.data;
        }).catch((err) => {
          throw new Error(err.response?.data?.message?? 'An error occurred');
        });
      },
    });
  }

  useUpdateMutation(id: Ref<number>) {
    return useMutation({
      mutationKey: [`${this.key}_update`, id],
      mutationFn: async (payload: T) => {
        return await this.update(id.value, payload).then((res) => {
          return res.data;
        }).catch((err) => {
          throw new Error(err.response?.data?.message?? 'An error occurred');
        });
      },
    });
  }

  useRemoveMutation() {
    return useMutation({
      mutationKey: [`${this.key}_remove`],
      mutationFn: async (id: number) => {
        return await this.remove(id).then((res) => {
          return res.data;
        }).catch((err) => {
          throw err;
        });
      },
    });
  }
}

export default QueryService;
