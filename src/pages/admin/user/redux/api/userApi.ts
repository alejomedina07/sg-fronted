import { createApi }       from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../../../utils/api/apiConst';


export const userApi = createApi({

  reducerPath: 'userApi',

  baseQuery: baseQueryWithReauth,


  endpoints: (build)=> ({

    getUsers: build.query({
      query: ( )=> '/user',
      keepUnusedDataFor: 0,
    }),
    addUser: build.mutation<any, any>({
      query: ( body: any ) => ({
        url:'/user',
        method: 'POST',
        body,
      }),
    }),
    updateUser: build.mutation<any, any>({
      query: ( body: any ) => ({
        url:`/user/${ body.id }`,
        method: 'PUT',
        body,
      }),
    }),
  })

})

export const { useGetUsersQuery, useAddUserMutation, useUpdateUserMutation } = userApi;

