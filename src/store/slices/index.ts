import { combineReducers } from '@reduxjs/toolkit';
import dialogs   from './dialogsSlice';
import snackbar   from './snackbarSlice';
import auth from '../../pages/public/auth/redux/slices/authSlice'
import appointment from '../../pages/admin/appointment/redux/slices/appointmentSlice'

const coreReducers = combineReducers({
  dialogs,
  auth,
  snackbar,
  appointment
});

export default coreReducers;
