import { Badge, IconButton } from '@mui/material';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import useNotes from '../redux/hooks/useNotes';

export const NotesButton = (params: any) => {
  const { selectNotesAction } = useNotes();
  const { entityType, entityId, count } = params;

  const onClickNotes = () => {
    selectNotesAction({ entityType, entityId, isOpenModalNotes: true });
  };

  return (
    <IconButton onClick={() => onClickNotes()} aria-label="notes">
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
