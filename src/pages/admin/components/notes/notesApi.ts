import { createApi } from '@reduxjs/toolkit/dist/query/react';
import baseQueryWithReauth from '../../../../utils/api/apiConst';

export const notesApi = createApi({
  reducerPath: 'notesApi',

  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    getNotes: build.query({
      query: (filters: string) => `/note${filters}`,
      keepUnusedDataFor: 0,
    }),
    addNotes: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/note',
        method: 'POST',
        body,
      }),
    }),
    updateNotes: build.mutation<any, any>({
      query: (body: any) => ({
        url: `/note/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { useGetNotesQuery, useAddNotesMutation, useUpdateNotesMutation } =
  notesApi;
