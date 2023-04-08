import { createApi }       from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../../../utils/api/apiConst';


export const expenseApi = createApi({

    reducerPath: 'expenseApi',

    baseQuery: baseQueryWithReauth,


    endpoints: (build)=> ({

        getExpense: build.query({
            query: ( )=> '/expense',
            keepUnusedDataFor: 30,
        }),
        addExpense: build.mutation<any, any>({
            query: ( body: any ) => ({
                url:'/expense',
                method: 'POST',
                body,
            }),
        }),
        updateExpense: build.mutation<any, any>({
            query: ( body: any ) => ({
                url:`/expense/${ body.id }`,
                method: 'PUT',
                body,
            }),
        }),

    })

})

export const { useGetExpenseQuery, useAddExpenseMutation, useUpdateExpenseMutation } = expenseApi;

