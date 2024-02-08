import useDialogs from '../../../store/hooks/dialogs/useDialogs';
import { Button } from '@mui/material';
import { SgSpinner } from '../../utils/spinner/SgSpinner';
import * as React from 'react';

interface SgButtonProps {
  confirmationMessage?: string;
  confirmationTitle?: string;
  onClickAction?(): void;
  onConfirm?(): void;
  onConfirmClose?(): void;
  sending?: boolean;
  disabled?: boolean;
  sendingText?: string;
  label: string;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined;
  variant?: 'text' | 'contained' | 'outlined' | undefined;
  classes?: string;
  type?: any;
}

export const SgButton = (props: SgButtonProps) => {
  const {
    confirmationMessage,
    confirmationTitle,
    onClickAction,
    onConfirm,
    onConfirmClose,
    sending,
    sendingText = 'Enviando...',
    label,
    color,
    variant,
    classes,
    type,
    disabled,
  } = props;
  const { openConfirmationDialog } = useDialogs();

  const _onClickAction = () => {
    if (onConfirm) {
      openConfirmationDialog(
        confirmationMessage || 'Confirm',
        onConfirm,
        onConfirmClose,
        confirmationTitle || 'Confirm'
      );
    } else if (onClickAction) {
      onClickAction();
    }
  };

  return (
    (!sending && (
      <Button
        className={classes}
        variant={variant || 'contained'}
        color={color || 'inherit'}
        onClick={_onClickAction}
        type={type}
        disabled={disabled}
      >
        {label}
      </Button>
    )) || <SgSpinner text={sendingText} />
  );
};
