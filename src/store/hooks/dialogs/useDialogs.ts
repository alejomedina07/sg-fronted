import useGlobalStore from '../useGlobalStore';
import {
  closeConfirmDialogAction,
  openConfirmDialogAction,
} from '../../slices/dialogsSlice';

interface ConfirmationDialogProps {
  message: string;
  callback: (params: any) => void;
  onClose: any;
  title: string;
}

function useDialogs() {
  const { dispatch, useTypedSelector } = useGlobalStore();

  const { message, onConfirm, dialogStatus, onClose, openedDialogs, title } =
    useTypedSelector(({ core }: any) => core.dialogs);

  const openConfirmationDialog = ({
    message,
    callback,
    onClose,
    title,
  }: ConfirmationDialogProps) =>
    dispatch(openConfirmDialogAction({ message, callback, onClose, title }));

  const closeConfirmationDialog = () => dispatch(closeConfirmDialogAction());

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
