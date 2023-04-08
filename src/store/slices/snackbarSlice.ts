import { createSlice } from '@reduxjs/toolkit';


const SLICE_NAME = 'snackbar';

export interface snackbarSliceProps {
  open: boolean,
  type: "error" | "info" | "success" | "warning"
  message: string,
}

// Slice
const initialState: snackbarSliceProps = {
  open: false,
  type: "info",
  message: '',
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
