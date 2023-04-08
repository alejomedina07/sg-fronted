import useGlobalStore                                      from '../../useGlobalStore';
import { closeSnackbar, openSnackbar, snackbarSliceProps } from '../../../slices/snackbarSlice';


function useSnackbar() {
  const { dispatch, useTypedSelector } = useGlobalStore();

  const { open, message, type } = useTypedSelector(({ core }: any) => core.snackbar);

  const openSnackbarAction = (data: snackbarSliceProps) => dispatch( openSnackbar(data) )

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