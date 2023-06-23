import useGlobalStore from '../../../../../../store/hooks/useGlobalStore';

import {
  notesSliceProps,
  closeModalNotes,
  openModalNotes,
  selectNotes,
  openModalNotesProps,
} from '../slices/notesSlice';

function useNotes() {
  const { dispatch, useTypedSelector } = useGlobalStore();
  const { notes, isOpenModalNotes, refresh, onClose, key, id } =
    useTypedSelector(({ core }: any) => core.notes);

  const selectNotesAction = (payload: notesSliceProps) =>
    dispatch(selectNotes(payload));

  const closeModalNotesAction = () => dispatch(closeModalNotes());

  const openModalNotesAction = (data: openModalNotesProps) =>
    dispatch(openModalNotes(data));

  return {
    notes,
    closeModalNotesAction,
    isOpenModalNotes,
    id,
    key,
    openModalNotesAction,
    onClose,
    refresh,
    selectNotesAction,
  };
}

export default useNotes;
