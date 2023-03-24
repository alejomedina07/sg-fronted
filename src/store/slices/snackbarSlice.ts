import { createSlice } from '@reduxjs/toolkit';


const SLICE_NAME = 'snackbar';

// Slice
const initialState = {
  open: false,
  message: '',
  type: '',
};

const snackbarSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    resetListsState: () => initialState,
    closeSnackbar: (state) => {
      state.open = false;
    },
    openSnackbar: (state,action) => {
      console.log(10, action.payload);
      state.open = true;
      state.message = action.payload.messageAction;
      state.type = action.payload.typeAction;
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
