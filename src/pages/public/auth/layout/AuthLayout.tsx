import { Grid, Typography } from '@mui/material';

export const AuthLayout = ({ children }: any) => {
  return (
    <>
      <Grid
        container
        className="login"
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh', padding: 4 }}
      >
        <Grid
          item
          className="box-shadow "
          xs={3}
          sx={{
            width: { sm: 450 },
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 2,
          }}
        >
          {/* <img src="/login.png" className="logo" alt="Vite logo" /> */}
          <div className="flex flex-col items-center">
            {/* <img */}
            {/*   src="images/logo11.png" */}
            {/*   width={200} */}
            {/*   className="logo" */}
            {/*   alt="Vite logo" */}
            {/* /> */}
            <img
              src="images/esvyda_logo.png"
              width={200}
              className="logo"
              alt="Vite logo"
            />
            <Typography variant="h4" gutterBottom>
              Iniciar session
            </Typography>
            {/* <div className="flex flex-column items-start"> */}
            {/*   <h1>Iniciar session</h1> */}
            {/* </div> */}
          </div>
          {children}
        </Grid>
      </Grid>
    </>
  );
};
