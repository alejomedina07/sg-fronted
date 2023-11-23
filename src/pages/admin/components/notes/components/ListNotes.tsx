import { useEffect, useState } from 'react';
import useNotes from '../redux/hooks/useNotes';
import { useGetNotesQuery } from '../redux/api/notesApi';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import DateFnsManager from '../../../../../services/utils/DateFnsManager';
import useAuth from '../../../../public/auth/redux/hooks/useAuth';

const dateManage = new DateFnsManager();

export const ListNotes = () => {
  const { editNoteAction, entityId, entityType, setRefreshListAction } =
    useNotes();

  const { data, isLoading, refetch } = useGetNotesQuery(
    `?entityType=${entityType}&entityId=${entityId}`,
    {
      skip: !entityType && !entityId,
    }
  );

  const [isSet, setIsSet] = useState(false);

  const refreshList = () => {
    refetch();
    return;
  };

  useEffect(() => {
    if (!isSet) {
      setRefreshListAction(refreshList);
      setIsSet(true);
    }
  }, [isSet]);

  const onClickEdit = (note: Note) => {
    editNoteAction(note);
  };

  const { userConnected } = useAuth();

  const [ListNotes, setListNotes] = useState<any[]>([]);

  useEffect(() => {
    if (data?.data?.length) {
      setListNotes([...data.data]);
    }
  }, [data]);

  return (
    <List
      sx={{
        width: '100%',
        bgColor: 'background.paper',
        className: 'flex flex-row items-center',
      }}
    >
      {ListNotes.map((option: Note, index) => {
        return (
          <span key={`span-${option.id}`}>
            <ListItem alignItems="flex-start" key={option.id}>
              ID: {option.id}
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="strong"
                      variant="body2"
                      color="text.primary"
                    >
                      {option.createdBy.firstName} {option.createdBy.lastName}
                    </Typography>
                    {'  ' +
                      dateManage.getFormatStandard(new Date(option.createdAt))}
                  </>
                }
                secondary={
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {option.title}
                    </Typography>
                    {'  ' + option.description}
                  </>
                }
              />
              {userConnected.id == option.createdBy.id && (
                <IconButton aria-label="view">
                  <EditIcon onClick={() => onClickEdit(option)} />
                </IconButton>
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </span>
        );
      })}
    </List>
  );
};
