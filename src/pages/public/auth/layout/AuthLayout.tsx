import { Grid } from '@mui/material';

export const AuthLayout = ({ children }: any) => {
  return (
    <>
      <Grid
        container className='login' spacing={ 0 }
        direction="column" alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh', padding: 4 }}
      >
        <Grid item
              className="box-shadow"
              xs={3}
              sx={{ width: { sm:450 }, backgroundColor: 'white', padding: 3, borderRadius: 2 }}>
          <img src="/login.png" className="logo" alt="Vite logo" />
          { children }
        </Grid>
      </Grid>
    </>
  );
}
