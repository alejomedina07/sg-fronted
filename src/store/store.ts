import { configureStore } from '@reduxjs/toolkit';
import core from './slices';
import { authApi } from '../pages/public/auth/redux/api/authApi';
import { userApi } from '../pages/admin/user/redux/api/userApi';
import { listApi } from './apis/listApi';
import { customerApi } from '../pages/admin/customer/redux/api/customerApi';
import { appointmentApi } from '../pages/admin/appointment/redux/api/appointmentApi';
import { expenseApi } from '../pages/admin/expense/redux/api/expenseApi';
import { inventoryApi } from '../pages/admin/inventory/redux/api/inventoryApi';
import { serviceApi } from '../pages/admin/service/redux/api/serviceApi';
import { notesApi } from '../pages/admin/components/notes/redux/api/notesApi';
import { reportApi } from '../pages/admin/reports/redux/api/reportApi';
import { rolApi } from '../pages/admin/config/rol/redux/api/rolApi';
import { surveyApi } from '../pages/admin/survey/redux/api/surveyApi';
import { turnApi } from '../pages/admin/turn/redux/api/turnApi';
import { bannerApi } from '../pages/admin/banner/redux/api/bannerApi';
import { providerApi } from '../pages/admin/provider/redux/api/providerApi';

export const store = configureStore({
  reducer: {
    core,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [listApi.reducerPath]: listApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [expenseApi.reducerPath]: expenseApi.reducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [rolApi.reducerPath]: rolApi.reducer,
    [surveyApi.reducerPath]: surveyApi.reducer,
    [turnApi.reducerPath]: turnApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [providerApi.reducerPath]: providerApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(listApi.middleware)
      .concat(customerApi.middleware)
      .concat(expenseApi.middleware)
      .concat(inventoryApi.middleware)
      .concat(serviceApi.middleware)
      .concat(appointmentApi.middleware)
      .concat(reportApi.middleware)
      .concat(notesApi.middleware)
      .concat(rolApi.middleware)
      .concat(surveyApi.middleware)
      .concat(turnApi.middleware)
      .concat(bannerApi.middleware)
      .concat(providerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
