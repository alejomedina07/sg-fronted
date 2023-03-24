import { SyntheticEvent, useState }                                               from 'react';
import { useDispatch }                                                            from 'react-redux';
import { Grid, TextField, Button, CircularProgress, Snackbar, Alert, AlertColor } from '@mui/material';
import { AuthLayout }                                                             from '../layout/AuthLayout.js';

import { UserLogin }        from '../dto/user';
import useAuth              from '../redux/hooks/useAuth';
import { useForm }          from '../redux/hooks/useForm';
import { useLoginMutation } from '../redux/api/authApi';

export const Login = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { addLoginAction } = useAuth();

  const [severity, setSeverity] = useState<AlertColor>( 'success' );

  const [message, setMessage] = useState<string>( '' );

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const dispatch = useDispatch()

  const [ login, { isLoading } ] = useLoginMutation()

  const initialForm: UserLogin = { email: '', password: '' };

  const { email, password, onInputChange }:any = useForm(initialForm) // TODO cambiar useForm

  const onSubmit = async ( event:SyntheticEvent ) => {
    event.preventDefault();
    try {
      const data = await login( { email, password }).unwrap()
      setSeverity('success')
      setMessage(data?.msg)
      addLoginAction( { ...data.user, token:data.token } )
      // dispatch( addLoginAction( { ...data.user, token:data.token } ) )
    } catch (e:any) {
      setSeverity('error')
      setMessage(e?.data?.message?.msg)
    } finally {
      setOpen(true);
    }
  }

  return (
    <>
      <AuthLayout title="Login!">
        {
          !!isLoading && <CircularProgress />
        }
        <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Correo" type="email"
                required={true} fullWidth
                placeholder="Correo electrónico"
                name="email" value={ email }
                onChange={ onInputChange }
              />

            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
              <TextField
                label="Contraseña" type="password"
                placeholder="Contraseña"
                name="password" fullWidth
                required={true} value={ password }
                onChange={ onInputChange }
              />
            </Grid>
            <Grid container spacing={ 2 } sx={{ mb:2, mt:2}}>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button type='submit' variant="contained" fullWidth> Iniciar sesión </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>

        {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}> */}
        {/*   <Alert onClose={handleClose} severity={ severity } sx={{ width: '100%' }}> */}
        {/*     { message } */}
        {/*   </Alert> */}
        {/* </Snackbar> */}

      </AuthLayout>
    </>
  );
}
