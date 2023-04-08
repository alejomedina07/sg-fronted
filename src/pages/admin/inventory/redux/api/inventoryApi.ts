import { createApi }       from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../../../utils/api/apiConst';


export const inventoryApi = createApi({

    reducerPath: 'inventoryApi',

    baseQuery: baseQueryWithReauth,


    endpoints: (build)=> ({

        getInventory: build.query({
            query: ( )=> '/inventory',
            keepUnusedDataFor: 0,
        }),
        addInventory: build.mutation<any, any>({
            query: ( body: any ) => ({
                url:'/inventory',
                method: 'POST',
                body,
            }),
        }),
        updateInventory: build.mutation<any, any>({
            query: ( body: any ) => ({
                url:`/inventory/${ body.id }`,
                method: 'PUT',
                body,
            }),
        }),

    })

})

export const { useGetInventoryQuery, useAddInventoryMutation, useUpdateInventoryMutation } = inventoryApi;