import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../../../utils/api/apiConst';

export const procedureApi = createApi({
  reducerPath: 'procedureApi',

  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    getProcedures: build.query({
      query: () => '/procedure',
      keepUnusedDataFor: 0,
    }),
    getProcedureById: build.query({
      query: (id) => `/procedure/${id}`,
      keepUnusedDataFor: 0,
    }),
    addProcedure: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/procedure',
        method: 'POST',
        body,
      }),
    }),
    updateProcedure: build.mutation<any, any>({
      query: (body: any) => ({
        url: `/procedure/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
    assignProcedure: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/procedure/assign/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetProceduresQuery,
  useGetProcedureByIdQuery,
  useAddProcedureMutation,
  useAssignProcedureMutation,
  useUpdateProcedureMutation,
} = procedureApi;
