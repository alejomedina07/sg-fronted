import { LinearProgress, Skeleton } from '@mui/material';
import React from 'react';

export const LoadingTurn = () => {
  return (
    <>
      <LinearProgress />
      <Skeleton className="my-4" variant="rounded" height={100} />
      <Skeleton variant="rounded" height={100} />
    </>
  );
};
