import useGlobalStore                  from '../../useGlobalStore';
import { closeSnackbar, openSnackbar } from '../../../slices/snackbarSlice';


function useSnackbar() {
  const { dispatch, useTypedSelector } = useGlobalStore();

  const { open, message, type } = useTypedSelector(({ core }: any) => core.snackbar);


  // @ts-ignore
  const openSnackbarAction = (data) => dispatch( openSnackbar(data) )
  // @ts-ignore
  const closeSnackbarAction = () => dispatch( closeSnackbar() )

  return {
    open,
    message,
    type,
    openSnackbarAction,
    closeSnackbarAction
  };
}

export default useSnackbar;