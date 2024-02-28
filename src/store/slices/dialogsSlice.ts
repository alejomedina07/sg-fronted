import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const SLICE_NAME = 'dialogs';

interface DialogsSliceProps {
  dialogStatus: boolean;
  message: string;
  title: string;
  onConfirm: Function | undefined;
  onClose: Function | undefined;
  openedDialogs: any;
}

// Slice
const initialState: DialogsSliceProps = {
  dialogStatus: false,
  message: '',
  title: '',
  onConfirm: undefined,
  onClose: undefined,
  openedDialogs: [],
};

const dialogsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    resetListsState: () => initialState,
    openConfirmDialogAction: (
      state,
      action: PayloadAction<{
        message: string;
        callback: (params: any) => void;
        onClose: any;
        title: string;
      }>
    ) => {
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

export const { closeConfirmDialogAction, openConfirmDialogAction } =
  dialogsSlice.actions;

export default dialogsSlice.reducer;
