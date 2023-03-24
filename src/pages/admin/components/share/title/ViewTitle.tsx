import { Typography } from '@mui/material';
import { ReactNode } from 'react';

interface ViewTitle {
  title: string;
  children?:ReactNode;
}

export const ViewTitle = (props:ViewTitle ) => {
  const { title, children } = props;
  return (
    <div className="flex flex-row items-center row-auto mb-4">
      <Typography variant="h5" gutterBottom className="flex-1 !mb-0">
        { title }
      </Typography>
      { children }
    </div>
  );
};
