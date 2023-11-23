import { styled } from '@mui/material/styles';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import React from 'react';

const Demo = styled('div')(({ theme }: any) => ({
  backgroundColor: theme.palette.background.paper,
  margin: '8px',
}));

interface PersonListComponentProps {
  user: any;
  take?: boolean;
  onTake?: () => void;
}

export const PersonListComponent = (props: PersonListComponentProps) => {
  const { user, onTake } = props;
  return (
    <Demo>
      <List dense>
        <ListItem
          secondaryAction={
            !!onTake && (
              <IconButton edge="end" aria-label="delete" onClick={onTake}>
                <SwipeRightIcon />
              </IconButton>
            )
          }
        >
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography variant="h4" component="b">
                {user}
              </Typography>
            }
            // secondary={'Secondary text'}
          />
        </ListItem>
      </List>
    </Demo>
  );
};
