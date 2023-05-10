import { combineReducers } from '@reduxjs/toolkit';
import dialogs from './dialogsSlice';
import forms from './formSlice';
import snackbar from './snackbarSlice';
import auth from '../../pages/public/auth/redux/slices/authSlice';
import appointment from '../../pages/admin/appointment/redux/slices/appointmentSlice';
import service from '../../pages/admin/service/redux/slices/serviceSlice';
import inventory from '../../pages/admin/inventory/redux/slices/inventorySlice';

const coreReducers = combineReducers({
  appointment,
  auth,
  dialogs,
  forms,
  inventory,
  service,
  snackbar,
});

export default coreReducers;
