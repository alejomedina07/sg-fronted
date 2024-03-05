import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../../../utils/api/apiConst';
import { paginationProps } from '../../../../../components/sgTable/dto/SgTableProps';

export const providerApi = createApi({
  reducerPath: 'providerApi',

  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    getProviders: build.query({
      query: (list) => `/provider${list}`,
      keepUnusedDataFor: 0,
    }),
    getProviderById: build.query({
      query: (id) => `/provider/${id}`,
      keepUnusedDataFor: 0,
    }),
    getAccountsPayable: build.query({
      query: (params: paginationProps) =>
        `/account-payable?page=${params?.page + 1}&limit=${params?.pageSize}${
          params?.order || ''
        }${params?.filters || ''}`,
      keepUnusedDataFor: 0,
    }),
    getAccountsPayableById: build.query({
      query: (id: number) => `/account-payable/${id}`,
      keepUnusedDataFor: 0,
    }),

    getPayments: build.query({
      query: (params: paginationProps) =>
        `/payment?page=${params?.page + 1}&limit=${params?.pageSize}${
          params?.order || ''
        }${params?.filters || ''}`,
      keepUnusedDataFor: 0,
    }),

    addProvider: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/provider',
        method: 'POST',
        body,
      }),
    }),
    addPayment: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/payment',
        method: 'POST',
        body,
      }),
    }),
    addAccountPayable: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/account-payable',
        method: 'POST',
        body,
      }),
    }),
    updateProvider: build.mutation<any, any>({
      query: (body: any) => ({
        url: `/provider/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useGetProvidersQuery,
  useGetPaymentsQuery,
  useGetProviderByIdQuery,
  useGetAccountsPayableQuery,
  useGetAccountsPayableByIdQuery,
  useAddProviderMutation,
  useAddAccountPayableMutation,
  useAddPaymentMutation,
  useUpdateProviderMutation,
} = providerApi;
