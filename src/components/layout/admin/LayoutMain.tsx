import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Grid } from '@mui/material';
import { NavBarItem, NavItem, navItems } from './componets';
import { Languages } from './componets/nav/Languages';
import { Environment } from '../../../utils/env/Environment';
import { ReactNode } from 'react';
import { HeaderProfile } from './componets/HeaderProfile';
import useAuth from '../../../pages/public/auth/redux/hooks/useAuth';
import { Link } from 'react-router-dom';
import { ApplicationConst } from '../../../pages/admin/router/consts/ApplicationConst';

const drawerWidth = 240;

const Application = new ApplicationConst();

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  '@media (max-width: 600px)': {
    width: '0',
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface LayoutMainProps {
  children: ReactNode;
}

export const LayoutMain = (props: LayoutMainProps) => {
  const { children } = props;
  const env = new Environment();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { userConnected } = useAuth();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getNavItem = (option: NavItem) => {
    return (
      <NavBarItem
        key={option.id}
        option={option}
        open={open}
        setOpen={setOpen}
      />
    );
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Grid container direction="row" alignItems="center">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
                >
                  <MenuIcon />
                </IconButton>
                {/* <img */}
                {/*   src={`${env.basePatch}/images/logo11.png`} */}
                {/*   alt="" */}
                {/*   width={60} */}
                {/*   className="hidden sm:block" */}
                {/* /> */}
                <Link to="/admin">
                  <img
                    src={`${env.basePatch}/images/previ_logo.png`}
                    alt=""
                    width={160}
                    className="hidden sm:block mr-2"
                  />
                </Link>
                {/* <Typography */}
                {/*   variant="h5" */}
                {/*   noWrap */}
                {/*   component="div" */}
                {/*   className="hidden sm:block" */}
                {/* > */}
                {/*   My doctor */}
                {/* </Typography> */}
              </Grid>
            </Grid>
            <div className="flex flex-row items-center">
              <HeaderProfile />
              <Languages />
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navItems.map((option: NavItem) => {
            if (
              userConnected.rol === 'Admin' ||
              (!option.onlyAdmin && userConnected.rol === 'User')
            ) {
              return getNavItem(option);
            } else {
              const response = Application.validatePrivileges(
                option,
                userConnected.privileges
              );
              if (response?.isValid) {
                option.link = response.link;
                return getNavItem(option);
              }
            }
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
