import { AppBar, Box } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { Environment } from '../../../utils/env/Environment';
import { Link } from 'react-router-dom';
import * as React from 'react';

const env = new Environment();

export const SgToolbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div className="flex flex-row items-center justify-center w-full">
            <Link to="/">
              <img
                src={`${env.basePatch}/images/previ_logo.png`}
                alt="Logo"
                width={160}
              />
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
