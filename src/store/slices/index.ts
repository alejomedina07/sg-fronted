import { combineReducers } from '@reduxjs/toolkit';
import dialogs   from './dialogsSlice';
import snackbar   from './snackbarSlice';
import auth from '../../pages/public/auth/redux/slices/authSlice'

const coreReducers = combineReducers({
  dialogs,
  auth,
  snackbar
});

export default coreReducers;
