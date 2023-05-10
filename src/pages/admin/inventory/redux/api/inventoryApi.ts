import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../../../utils/api/apiConst';

export const inventoryApi = createApi({
  reducerPath: 'inventoryApi',

  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    getInventory: build.query({
      query: () => '/inventory',
      keepUnusedDataFor: 0,
    }),
    getInventoryById: build.query({
      query: (id) => `/inventory/${id}`,
      keepUnusedDataFor: 0,
    }),
    addInventory: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/inventory',
        method: 'POST',
        body,
      }),
    }),
    updateInventory: build.mutation<any, any>({
      query: (body: any) => ({
        url: `/inventory/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
    inOutInventory: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/inventory-in-out',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetInventoryQuery,
  useGetInventoryByIdQuery,
  useAddInventoryMutation,
  useUpdateInventoryMutation,
  useInOutInventoryMutation,
} = inventoryApi;
