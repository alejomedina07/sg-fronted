import { createSlice } from '@reduxjs/toolkit';

export interface notesSliceProps {
  isOpenModalNotes: boolean;
  notes?: Notes | null;
  refresh?: () => void;
  onClose?: () => void;
  id?: number | null;
  key?: string | null;
}

export interface openModalNotesProps {
  refresh?: () => void;
  onClose?: () => void;
}

const initialState: notesSliceProps = { isOpenModalNotes: false };

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    selectNotes: (state, action) => {
      state.key = action.payload.key;
      state.id = action.payload.id;
      state.isOpenModalNotes = action.payload.isOpenModalNotes;
    },
    closeModalNotes: (state) => {
      state.key = null;
      state.id = null;
      state.isOpenModalNotes = false;
    },
    openModalNotes: (state, action) => {
      state.notes = null;
      state.isOpenModalNotes = true;
      state.onClose = action.payload.onClose;
    },
  },
});

// Action creators are generated for each case reducer function
export const { closeModalNotes, selectNotes, openModalNotes } =
  notesSlice.actions;

export default notesSlice.reducer;
