import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import { Environment } from '../env/Environment';

const env = new Environment;

const baseQuery = fetchBaseQuery({
  // baseUrl: 'http://localhost:3000/api', // TODO EnvVariables().VITE_API_URL,
  baseUrl: env.baseUrl, // TODO EnvVariables().VITE_API_URL,
  prepareHeaders: (headers, { getState }: any) => {
    const token = getState().core?.auth?.token || null;
    if (token) headers.set('authorization', `Bearer ${token}`)
  }
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
  > = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    localStorage.setItem('state', '');
    location.reload();
  }
  return result
}

export default baseQueryWithReauth;