import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../utils/api/apiConst';

export const listApi = createApi({
  reducerPath: 'listApi',

  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    getListByKey: build.query({
      query: (key: string) => `/config/list?key=${key}`,
      keepUnusedDataFor: 0,
    }),

    getAllOptions: build.query({
      query: () => '/config/list/all-options',
    }),

    addOption: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/config/list',
        method: 'POST',
        body,
      }),
    }),

    updateOption: build.mutation<any, any>({
      query: (body: any) => ({
        url: `/config/list/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useGetListByKeyQuery,
  useGetAllOptionsQuery,
  useAddOptionMutation,
  useUpdateOptionMutation,
} = listApi;
