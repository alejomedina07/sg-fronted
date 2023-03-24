import { Alert, Slide, SlideProps, Snackbar } from '@mui/material';
import useSnackbar                            from '../../../store/hooks/notifications/snackbar/useSnackbar';

const vertical= 'bottom', horizontal='right';

function SlideTransition(props: SlideProps) {
  // @ts-ignore
  return <Slide {...props} direction="down" />;
}

export const SgSnackbar = () => {
  const { open, closeSnackbarAction, message, type } = useSnackbar();
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={106000}
      onClose={closeSnackbarAction}
      key={vertical + horizontal}
      TransitionComponent={SlideTransition}
    >
      <Alert severity={ type } sx={{ width: '100%' }} variant="filled" onClose={closeSnackbarAction}>
        { message }
      </Alert>
    </Snackbar>
  );
};
