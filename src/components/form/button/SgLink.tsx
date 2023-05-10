import { ReactNode }                                            from 'react';
import { Button, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link }                                                 from 'react-router-dom';
import * as React                                               from 'react';

interface SgLinkProps {
  label: string;
  to: string;
  classes?: string;
  icon?: ReactNode;
}

export const SgLink = (props: SgLinkProps) => {
  const { label, to, icon, classes } = props;
  return (
    <Button component={Link} to={ to } variant="outlined" className={classes || ''}>
      {!! icon && ( <ListItemIcon>{ icon }</ListItemIcon>)}
      {label}
    </Button>
    // <Link to={ to } className="bg-white rounded border-2 shadow">
    //   <ListItem disablePadding>
    //     <ListItemButton className="!py-1 ">
    //       {!! icon && ( <ListItemIcon>{ icon }</ListItemIcon>)}
    //       <ListItemText primary={label} className="!m-0"/>
    //     </ListItemButton>
    //   </ListItem>
    // </Link>
  );
};
