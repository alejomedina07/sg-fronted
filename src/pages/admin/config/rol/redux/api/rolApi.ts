import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../../../../utils/api/apiConst';

export const rolApi = createApi({
  reducerPath: 'rolApi',

  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    getRoles: build.query({
      query: () => '/config/rol',
      keepUnusedDataFor: 0,
    }),
    getPrivileges: build.query({
      query: () => '/config/permission/privileges',
      keepUnusedDataFor: 30,
    }),
    getPermission: build.query({
      query: () => '/config/permission',
      keepUnusedDataFor: 0,
    }),
    addRol: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/config/rol',
        method: 'POST',
        body,
      }),
    }),
    updateRol: build.mutation<any, any>({
      query: (body: any) => ({
        url: `/config/rol/${body.rol.id}`,
        method: 'PUT',
        body,
      }),
    }),
    addPermission: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/config/permission',
        method: 'POST',
        body,
      }),
    }),
    updatePermission: build.mutation<any, any>({
      query: (body: any) => ({
        url: `/config/permission/${body.rol.id}`,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetPermissionQuery,
  useGetPrivilegesQuery,
  useAddRolMutation,
  useUpdateRolMutation,
  useAddPermissionMutation,
  useUpdatePermissionMutation,
} = rolApi;
