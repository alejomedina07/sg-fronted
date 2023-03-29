import { createApi }       from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../../../utils/api/apiConst';


export const customerApi = createApi({

  reducerPath: 'customerApi',

  baseQuery: baseQueryWithReauth,


  endpoints: (build)=> ({

    getCustomers: build.query({
      query: ( )=> '/customer',
      keepUnusedDataFor: 30,
    }),
    addCustomer: build.mutation<any, any>({
      query: ( body: any ) => ({
        url:'/customer',
        method: 'POST',
        body,
      }),
    }),

  })

})

export const { useGetCustomersQuery, useAddCustomerMutation } = customerApi;

