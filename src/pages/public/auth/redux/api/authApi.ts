import { createApi }       from '@reduxjs/toolkit/query/react';
import { UserLogin }       from '../../../auth/dto/user';
import baseQueryWithReauth from '../../../../../utils/api/apiConst';


export const authApi = createApi({

  reducerPath: 'authApi',

  baseQuery: baseQueryWithReauth,


  endpoints: (build)=> ({

    getUsers: build.query({
      query: ( arg )=> '/user'
    }),
    login: build.mutation<any, any>({
      query: ( body: UserLogin ) => ({
        url:'/auth',
        method: 'POST',
        body,
      }),
    }),
    updateProfile: build.mutation<any, any>({
      query: ( body: any ) => ({
        url:'/user/update-profile',
        method: 'POST',
        body,
      }),
    })

  })

})

export const { useGetUsersQuery, useLoginMutation, useUpdateProfileMutation } = authApi;

