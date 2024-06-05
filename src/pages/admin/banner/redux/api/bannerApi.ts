import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../../../utils/api/apiConst';

export const bannerApi = createApi({
  reducerPath: 'bannerApi',

  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    getBanners: build.query({
      query: () => '/banner',
      keepUnusedDataFor: 0,
    }),
    getBannerList: build.query({
      query: () => '/banner/list',
      keepUnusedDataFor: 0,
    }),
    addBanner: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/banner',
        method: 'POST',
        body,
      }),
    }),
    updateBanner: build.mutation<any, any>({
      query: (body: any) => ({
        url: `/banner/${body.id}`,
        method: 'PUT',
        body: body.data,
      }),
    }),
  }),
});

export const {
  useGetBannersQuery,
  useGetBannerListQuery,
  useAddBannerMutation,
  useUpdateBannerMutation,
} = bannerApi;
