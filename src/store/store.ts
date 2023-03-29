import { configureStore } from '@reduxjs/toolkit'
import core               from './slices'
import { authApi }        from '../pages/public/auth/redux/api/authApi';
import { userApi }        from '../pages/admin/user/redux/api/userApi';
import { listApi }        from './apis/listApi';
import { customerApi } from '../pages/admin/customer/redux/api/customerApi';
import { appointmentApi } from '../pages/admin/appointment/redux/api/appointmentApi';

export const store = configureStore({
  reducer: {
    core,
    [ authApi.reducerPath ]: authApi.reducer,
    [ userApi.reducerPath ]: userApi.reducer,
    [ listApi.reducerPath ]: listApi.reducer,
    [ customerApi.reducerPath ]: customerApi.reducer,
    [ appointmentApi.reducerPath ]: appointmentApi.reducer,

  },

  middleware: ( getDefaultMiddleware ) => getDefaultMiddleware({ serializableCheck: false})
    .concat(authApi.middleware)
    .concat(userApi.middleware)
    .concat(listApi.middleware)
    .concat(customerApi.middleware)
    .concat(appointmentApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
