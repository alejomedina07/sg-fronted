import { createApi }       from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../../../utils/api/apiConst';


export const serviceApi = createApi({

  reducerPath: 'serviceApi',

  baseQuery: baseQueryWithReauth,


  endpoints: (build)=> ({

    getService: build.query({
      query: ( )=> '/service',
      keepUnusedDataFor: 0,
    }),
    addService: build.mutation<any, any>({
      query: ( body: any ) => ({
        url:'/service',
        method: 'POST',
        body,
      }),
    }),

  })

})

export const { useGetServiceQuery, useAddServiceMutation } = serviceApi;

