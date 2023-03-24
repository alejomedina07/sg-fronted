import { ReactNode }                                            from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link }                                                 from 'react-router-dom';
import * as React                                               from 'react';

interface SgLinkProps {
  label: string;
  to: string;
  icon?: ReactNode;
}

export const SgLink = (props: SgLinkProps) => {
  const { label, to, icon } = props;
  return (
    <Link to={ to } className="bg-white rounded border-2 shadow">
      <ListItem disablePadding>
        <ListItemButton className="!py-1 ">
          {!! icon && ( <ListItemIcon>{ icon }</ListItemIcon>)}
          <ListItemText primary={label} className="!m-0"/>
        </ListItemButton>
      </ListItem>
    </Link>
  );
};
