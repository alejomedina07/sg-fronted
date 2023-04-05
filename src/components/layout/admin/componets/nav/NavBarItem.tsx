import * as React                                               from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link }                                                 from 'react-router-dom';
import { NavItem }                                              from '../index';
import {t} from 'i18next';

interface NavBarItemProps {
  option: NavItem;
  open?: boolean;
}

export const NavBarItem = (props:NavBarItemProps) => {
  const { option, open } = props;
  return (
    <Link to={ option.link } className='link-nav-bar'>
      <ListItem key={option.id} disablePadding >
        <ListItemButton
          sx={{
            minHeight: 48, px: 2.5,
            justifyContent: open ? 'initial' : 'center',
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0, mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            { option.icon }
          </ListItemIcon>
          <ListItemText primary={t(option.name)} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
}
