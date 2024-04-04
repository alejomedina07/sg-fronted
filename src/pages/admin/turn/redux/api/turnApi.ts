import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../../../utils/api/apiConst';

export const turnApi = createApi({
  reducerPath: 'turnApi',

  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    getTurnTypes: build.query({
      query: () => '/turn/type',
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
        url: '/attention',
        method: 'POST',
        body,
      }),
    }),
    addFinishAttention: build.mutation<any, any>({
      query: (body: any) => ({
        url: `/attention/finish/${body.id}`,
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
  }),
});

export const {
  useGetTurnTypesQuery,
  useGetTurnTypesListQuery,
  useAddTurnTypeMutation,
  useAddTurnMutation,
  useAddAttentionMutation,
  useAddFinishAttentionMutation,
  useUpdateTurnTypeMutation,
} = turnApi;
