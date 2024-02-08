import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
  className?: string;
}

export const SgTabPanel = (props: TabPanelProps) => {
  const { children, value, index, className, ...other } = props;

  return (
    <div
      className={className}
      role="tabpanel"
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};
