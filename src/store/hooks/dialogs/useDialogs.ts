import useGlobalStore                                        from '../useGlobalStore';
import { closeConfirmDialogAction, openConfirmDialogAction } from '../../slices/dialogsSlice';

function useDialogs() {
  const { dispatch, useTypedSelector } = useGlobalStore();

  const { message, onConfirm, dialogStatus, onClose, openedDialogs, title } = useTypedSelector(({ core }: any) => core.dialogs);

  const openConfirmationDialog = (message: string, callback: Function, onClose: any, title: string) => dispatch( openConfirmDialogAction({ message, callback, onClose, title }) )

  const closeConfirmationDialog = () => dispatch( closeConfirmDialogAction() )



  return {
    dialogStatus,
    openConfirmationDialog,
    onConfirm,
    onClose,
    openedDialogs,
    message,
    title,
    closeConfirmationDialog,
  };
}

export default useDialogs;