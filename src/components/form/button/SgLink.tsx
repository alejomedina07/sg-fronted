import { ReactNode } from 'react';
import { Button, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import * as React from 'react';

interface SgLinkProps {
  label: string;
  to: string;
  classes?: string;
  icon?: ReactNode;
}

export const SgLink = (props: SgLinkProps) => {
  const { label, to, icon, classes } = props;
  return (
    <Button
      component={Link}
      to={to}
      variant="outlined"
      className={classes || ''}
    >
      {!!icon && <ListItemIcon>{icon}</ListItemIcon>}
      {label}
    </Button>
  );
};
