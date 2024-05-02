import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../../../utils/api/apiConst';
import { paginationProps } from '../../../../../components/sgTable/dto/SgTableProps';

export const turnApi = createApi({
  reducerPath: 'turnApi',

  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    getAttention: build.query({
      query: (turnId: number) => `/turn/attention/${turnId}`,
      keepUnusedDataFor: 0,
    }),
    getAttentions: build.query({
      query: (params: paginationProps) =>
        `/attentions?page=${params?.page + 1}&limit=${params?.pageSize}${
          params?.order || ''
        }${params?.filters || ''}`,
      keepUnusedDataFor: 0,
    }),
    getTurn: build.query({
      query: (params: paginationProps) =>
        `/turn?page=${params?.page + 1}&limit=${params?.pageSize}${
          params?.order || ''
        }${params?.filters || ''}`,
      keepUnusedDataFor: 0,
    }),
    getTurnTypes: build.query({
      query: () => '/turn/type',
      keepUnusedDataFor: 0,
    }),
    getCountTurnTypes: build.query({
      query: () => '/turn/type/count',
      keepUnusedDataFor: 0,
    }),
    getTurnTypesList: build.query({
      query: () => '/turn/type/list',
      keepUnusedDataFor: 0,
    }),
    addTurnType: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/turn/type',
        method: 'POST',
        body,
      }),
    }),
    addTurn: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/turn',
        method: 'POST',
        body,
      }),
    }),
    addAttention: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/attentions',
        method: 'POST',
        body,
      }),
    }),
    addFinishAttention: build.mutation<any, any>({
      query: (body: any) => ({
        url: `/attentions/finish/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
    updateTurnType: build.mutation<any, any>({
      query: (body: any) => ({
        url: `/turn/type/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
    reassignTurnType: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/attentions/reassign',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useGetAttentionQuery,
  useGetAttentionsQuery,
  useGetTurnQuery,
  useGetTurnTypesQuery,
  useGetCountTurnTypesQuery,
  useGetTurnTypesListQuery,
  useAddTurnTypeMutation,
  useAddTurnMutation,
  useAddAttentionMutation,
  useAddFinishAttentionMutation,
  useUpdateTurnTypeMutation,
  useReassignTurnTypeMutation,
} = turnApi;
