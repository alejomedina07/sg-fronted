import { AppBar, Box } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { Environment } from '../../../utils/env/Environment';

const env = new Environment();

export const SgToolbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div className="flex flex-row items-center justify-center w-full">
            <img
              src={`${env.basePatch}/images/previ_logo.png`}
              alt=""
              width={160}
            />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
