import { createApi }       from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../../../utils/api/apiConst';


export const customerApi = createApi({

  reducerPath: 'customerApi',

  baseQuery: baseQueryWithReauth,


  endpoints: (build)=> ({

    getCustomers: build.query({
      query: ( )=> '/customer',
      keepUnusedDataFor: 0,
    }),
    getCustomerById: build.query({
      query: ( id)=> `/customer/${id}`,
      keepUnusedDataFor: 0,
    }),
    addCustomer: build.mutation<any, any>({
      query: ( body: any ) => ({
        url:'/customer',
        method: 'POST',
        body,
      }),
    }),
    updateCustomer: build.mutation<any, any>({
      query: ( body: any ) => ({
        url:`/customer/${ body.id }`,
        method: 'PUT',
        body,
      }),
    }),

  })

})

export const { useGetCustomersQuery, useGetCustomerByIdQuery, useAddCustomerMutation, useUpdateCustomerMutation } = customerApi;

