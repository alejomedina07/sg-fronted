import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'snackbar';

export interface snackbarSliceProps {
  open?: boolean;
  type: 'error' | 'info' | 'success' | 'warning';
  message: string | object;
}

// Slice
const initialState: snackbarSliceProps = {
  open: false,
  type: 'info',
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
    openSnackbar: (state, action) => {
      state.open = true;
      if (
        typeof action?.payload?.message === 'object' &&
        action?.payload?.message !== null
      ) {
        const keysString: string = Object.values(action.payload.message).join(
          ', '
        );
        state.message = state.message = keysString;
      } else state.message = state.message = action.payload.message;
      state.type = action.payload.type;
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
