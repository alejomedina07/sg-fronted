import { createSlice } from '@reduxjs/toolkit';

export interface notesSliceProps {
  isOpenModalNotes: boolean;
  notes?: Note | null;
  noteEdit?: Note | null;
  refresh?: () => void;
  onClose?: () => void;
  entityId?: number | null;
  entityType?: string | null;
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
      state.entityType = action.payload.entityType;
      state.entityId = action.payload.entityId;
      state.isOpenModalNotes = action.payload.isOpenModalNotes;
    },
    editNote: (state, action) => {
      state.noteEdit = action.payload;
    },
    closeModalNotes: (state) => {
      state.entityType = null;
      state.entityId = null;
      state.noteEdit = null;
      state.isOpenModalNotes = false;
    },
    openModalNotes: (state, action) => {
      state.isOpenModalNotes = true;
      state.onClose = action.payload.onClose;
      state.noteEdit = null;
    },
    setRefreshList: (state, action) => {
      console.log(100, action.payload);
      state.refresh = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  closeModalNotes,
  selectNotes,
  openModalNotes,
  editNote,
  setRefreshList,
} = notesSlice.actions;

export default notesSlice.reducer;
