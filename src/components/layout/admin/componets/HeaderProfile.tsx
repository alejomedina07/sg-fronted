import { Avatar, Divider, Grid, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useState }                                                        from "react";
import { Link }                                                            from "react-router-dom";
import { Logout, Settings }                                                from '@mui/icons-material';
import useAuth
                                                                           from '../../../../pages/public/auth/redux/hooks/useAuth';

export const HeaderProfile = () => {
  const { addLogoutAction, userConnected } = useAuth();

  const handleLogout = ()=> {
    addLogoutAction()
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item>
      <Grid container direction='row' alignItems='center'>
        <div> Hola: {`${ userConnected?.firstName || '' }  ${ userConnected?.lastName || '' }` || 'Usuario'} </div>
        <div>
          <IconButton
            aria-label="more" id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true" onClick={handleClick}>
            <Avatar>{ userConnected?.firstName?.split(' ')[0][0] || 'a'}</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl} id="account-menu" open={open}
            onClose={handleClose} onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Link to='/profile' className='link-nav-bar'>
              <MenuItem ><Avatar /> Mi perfil</MenuItem>
            </Link>
            {/* <MenuItem><Avatar /> Mi cuenta</MenuItem> */}
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Configuración
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Cerrar Sesión
            </MenuItem>
          </Menu>
        </div>
      </Grid>
    </Grid>
  );
};
