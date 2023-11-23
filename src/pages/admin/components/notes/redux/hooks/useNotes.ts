import useGlobalStore from '../../../../../../store/hooks/useGlobalStore';

import {
  notesSliceProps,
  closeModalNotes,
  editNote,
  openModalNotes,
  selectNotes,
  openModalNotesProps,
  setRefreshList,
} from '../slices/notesSlice';

function useNotes() {
  const { dispatch, useTypedSelector } = useGlobalStore();
  const {
    notes,
    isOpenModalNotes,
    refresh,
    onClose,
    entityType,
    entityId,
    noteEdit,
  } = useTypedSelector(({ core }: any) => core.notes);

  const selectNotesAction = (payload: notesSliceProps) =>
    dispatch(selectNotes(payload));

  const closeModalNotesAction = () => dispatch(closeModalNotes());

  const openModalNotesAction = (data: openModalNotesProps) =>
    dispatch(openModalNotes(data));

  const editNoteAction = (note: Note) => dispatch(editNote(note));

  const setRefreshListAction = (refresh: () => void) =>
    dispatch(setRefreshList(refresh));

  return {
    notes,
    closeModalNotesAction,
    isOpenModalNotes,
    entityId,
    entityType,
    openModalNotesAction,
    onClose,
    refresh,
    selectNotesAction,
    editNoteAction,
    noteEdit,
    setRefreshListAction,
  };
}

export default useNotes;
