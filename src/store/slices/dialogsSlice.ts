import { createSlice } from '@reduxjs/toolkit';


const SLICE_NAME = 'dialogs';

// Slice
const initialState = {
  dialogStatus: false,
  message: '',
  title: '',
  onConfirm: undefined,
  onClose: undefined,
  openedDialogs: []
};

const referSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    resetListsState: () => initialState,
    openConfirmDialogAction: (state, action) => {
      state.onConfirm = action.payload.callback;
      state.onClose = action.payload.onClose;
      state.message = action.payload.message;
      state.title = action.payload.title;
      state.dialogStatus = true;
    },
    closeConfirmDialogAction: (state) => {
      state.dialogStatus = false;
    },
  },
});

export const { closeConfirmDialogAction, openConfirmDialogAction } = referSlice.actions;

export default referSlice.reducer;
