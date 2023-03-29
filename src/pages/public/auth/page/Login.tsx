import { SyntheticEvent }                                               from 'react';
import { Grid, TextField, Button, CircularProgress } from '@mui/material';
import { AuthLayout }                                                             from '../layout/AuthLayout.js';

import { UserLogin }        from '../dto/user';
import useAuth              from '../redux/hooks/useAuth';
import { useForm }          from '../redux/hooks/useForm';
import { useLoginMutation } from '../redux/api/authApi';
import useSnackbar          from '../../../../store/hooks/notifications/snackbar/useSnackbar';

export const Login = () => {
  const { addLoginAction } = useAuth();
  const { openSnackbarAction } = useSnackbar();
  const initialForm: UserLogin = { phoneNumber: '', password: '' };
  const { phoneNumber, password, onInputChange }:any = useForm(initialForm);
  const [ login, { isLoading } ] = useLoginMutation()


  const onSubmit = async ( event:SyntheticEvent ) => {
    event.preventDefault();
    try {
      const data = await login( { phoneNumber, password }).unwrap()
      addLoginAction( { ...data.user, token:data.token } )
      openSnackbarAction({ messageAction: data.msg || 'Iniciando sessión', typeAction: 'success' })
    } catch (e:any) {
      openSnackbarAction({ messageAction: e.msg || 'Error por favor vuelve a intentarlo', typeAction: 'error' })
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
                label="Número de teléfono" type="text"
                required={true} fullWidth
                placeholder="Número de teléfono"
                name="phoneNumber" value={ phoneNumber }
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
