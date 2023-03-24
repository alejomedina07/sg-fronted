import { createApi }       from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../utils/api/apiConst';


export const listApi = createApi({

  reducerPath: 'listApi',

  baseQuery: baseQueryWithReauth,


  endpoints: (build)=> ({

    getListByKey: build.query({
      query: ( key: string )=> `/config/list?key=${key}`
    }),
    getAllOptions: build.query({
      query: ()=> '/config/list/all-options'
    }),

  })

})

export const { useGetListByKeyQuery } = listApi;

