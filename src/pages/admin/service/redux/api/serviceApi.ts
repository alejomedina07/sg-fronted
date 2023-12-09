import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../../../utils/api/apiConst';
import { paginationProps } from '../../../../../components/table/dto/SgTableProps';

export const serviceApi = createApi({
  reducerPath: 'serviceApi',

  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    getService: build.query({
      query: (params: paginationProps) =>
        `/service?page=${params.page}&limit=${params.pageSize}`,
      keepUnusedDataFor: 0,
    }),
    addService: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/service',
        method: 'POST',
        body,
      }),
    }),
    updateService: build.mutation<any, any>({
      query: (body: any) => ({
        url: `/service/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useGetServiceQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
} = serviceApi;
