import { useGetNotesQuery } from '../notesApi';
import useNotes from '../redux/hooks/useNotes';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import DateFnsManager from '../../../../../services/utils/DateFnsManager';

const dateManage = new DateFnsManager();

export const ListNotes = (params: any) => {
  const { selectNotesAction, id, key, openModalNotesAction } = useNotes();
  const { count } = params;

  const { data, isLoading, refetch } = useGetNotesQuery(`?key=${key}&id=${id}`);

  const onClickEdit = (params: GridRenderCellParams) => {
    openModalNotesAction({ refresh: refetch });
    selectNotesAction(params.row);
  };

  const [ListNotes, setListNotes] = useState<any[]>([]);

  useEffect(() => {
    if (data?.data?.length) setListNotes([...data.data]);
  }, [data]);

  console.log(222, data);

  // const ListNotes = [
  //   {
  //     title: 'Titulo 1',
  //     description:
  //       'description 3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae fuga fugit harum iste magnam minus officia quasi voluptas! Blanditiis dignissimos esse facere fugiat illum laboriosam neque odio quam quisquam, velit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae fuga fugit harum iste magnam minus officia quasi voluptas! Blanditiis dignissimos esse facere fugiat illum laboriosam neque odio quam quisquam, velit.',
  //     createdBy: 'usuario 1',
  //     createdAt: 'today',
  //     id: 1,
  //   },
  //   {
  //     title: 'Titulo 2',
  //     description:
  //       'description 3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae fuga fugit harum iste magnam minus officia quasi voluptas! Blanditiis dignissimos esse facere fugiat illum laboriosam neque odio quam quisquam, velit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae fuga fugit harum iste magnam minus officia quasi voluptas! Blanditiis dignissimos esse facere fugiat illum laboriosam neque odio quam quisquam, velit.',
  //     createdBy: 'usuario 2',
  //     createdAt: 'today',
  //     id: 2,
  //   },
  //   {
  //     title: 'Titulo 3',
  //     description:
  //       'description 3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae fuga fugit harum iste magnam minus officia quasi voluptas! Blanditiis dignissimos esse facere fugiat illum laboriosam neque odio quam quisquam, velit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae fuga fugit harum iste magnam minus officia quasi voluptas! Blanditiis dignissimos esse facere fugiat illum laboriosam neque odio quam quisquam, velit.',
  //     createdBy: 'usuario 3',
  //     createdAt: 'today',
  //     id: 3,
  //   },
  //   {
  //     title: 'Titulo 4',
  //     description:
  //       'description 3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae fuga fugit harum iste magnam minus officia quasi voluptas! Blanditiis dignissimos esse facere fugiat illum laboriosam neque odio quam quisquam, velit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae fuga fugit harum iste magnam minus officia quasi voluptas! Blanditiis dignissimos esse facere fugiat illum laboriosam neque odio quam quisquam, velit.',
  //     createdBy: 'usuario 4',
  //     createdAt: 'yesterday',
  //     id: 3,
  //   },
  // ];

  return (
    <List
      sx={{
        width: '100%',
        bgColor: 'background.paper',
        className: 'flex flex-row items-center',
      }}
    >
      {ListNotes.map((option: any) => (
        <>
          <ListItem alignItems="flex-start" key={option.id}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
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
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {option.title}
                  </Typography>
                  {'  ' + option.description}
                </React.Fragment>
              }
            />
            <IconButton aria-label="view">
              <EditIcon onClick={() => onClickEdit(params)} />
            </IconButton>
            <IconButton aria-label="view">
              <DeleteIcon />
            </IconButton>
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
  );
};
