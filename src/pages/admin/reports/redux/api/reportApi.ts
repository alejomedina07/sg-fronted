import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../../../utils/api/apiConst';

export const reportApi = createApi({
  reducerPath: 'reportApi',

  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    getReportMain: build.query({
      query: (filters) => `/report${filters}`,
      keepUnusedDataFor: 0,
    }),
    getReportDashboard: build.query({
      query: (filters) => `/report/dashboard${filters}`,
      keepUnusedDataFor: 0,
    }),
    getReportProducts: build.query({
      query: (filters) => `/report/products${filters}`,
      keepUnusedDataFor: 0,
    }),
    getReportTurns: build.query({
      query: (filters) => `/report/turns${filters}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useGetReportMainQuery,
  useGetReportDashboardQuery,
  useGetReportProductsQuery,
  useGetReportTurnsQuery,
} = reportApi;
