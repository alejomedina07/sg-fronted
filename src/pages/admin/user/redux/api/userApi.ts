import { createApi }       from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../../../utils/api/apiConst';


export const userApi = createApi({

  reducerPath: 'userApi',

  baseQuery: baseQueryWithReauth,


  endpoints: (build)=> ({

    getUsers: build.query({
      query: ( )=> '/user'
    }),
    addUser: build.mutation<any, any>({
      query: ( body: any ) => ({
        url:'/user',
        method: 'POST',
        body,
      }),
    }),

  })

})

export const { useGetUsersQuery, useAddUserMutation } = userApi;

