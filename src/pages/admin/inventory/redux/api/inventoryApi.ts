import { createApi }       from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../../../utils/api/apiConst';


export const inventoryApi = createApi({

    reducerPath: 'inventoryApi',

    baseQuery: baseQueryWithReauth,


    endpoints: (build)=> ({

        getInventory: build.query({
            query: ( )=> '/expense',
            keepUnusedDataFor: 30,
        }),
        addInventory: build.mutation<any, any>({
            query: ( body: any ) => ({
                url:'/inventory',
                method: 'POST',
                body,
            }),
        }),

    })

})

export const { useGetInventoryQuery, useAddInventoryMutation } = inventoryApi;