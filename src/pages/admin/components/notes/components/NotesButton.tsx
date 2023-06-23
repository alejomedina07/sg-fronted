import { GridRenderCellParams } from '@mui/x-data-grid';
import { Badge, IconButton } from '@mui/material';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import useNotes from '../redux/hooks/useNotes';
import { useGetNotesQuery } from '../notesApi';

export const NotesButton = (params: any) => {
  const { selectNotesAction, openModalNotesAction } = useNotes();
  const { keyProp, id, count } = params;
  const { data, isLoading } = useGetNotesQuery('');

  const onClickNotes = (params: GridRenderCellParams) => {
    // openModalNotesAction({ refresh: refetch });
    selectNotesAction({ key: keyProp, id, isOpenModalNotes: true });
  };

  return (
    <IconButton onClick={() => onClickNotes(params)} aria-label="notes">
      <Badge
        badgeContent={count || 0}
        color="primary"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <StickyNote2OutlinedIcon />
      </Badge>
    </IconButton>
  );
};
