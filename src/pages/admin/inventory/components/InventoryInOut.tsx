import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import useInventory from '../redux/hooks/useInventory';
import { inventoryScheme } from '../validation/inventoryInOutScheme';
import { SgTransition } from '../../../../components/utils/dialogs/SgTransition';
import { SgDialogTitle } from '../../../../components/utils/dialogs/SgDialogTitle';
import { SgButton } from '../../../../components/form/button/SgButton';
import { useInOutInventoryMutation } from '../redux/api/inventoryApi';
import { SgInput } from '../../../../components/form/SgInput';
import { SgCheckbox } from '../../../../components/form/SgCheckbox';
import useSnackbar from '../../../../store/hooks/notifications/snackbar/useSnackbar';

export const InventoryInOut = () => {
  const {
    onClose,
    refresh,
    closeModalInventoryAction,
    isOpenModalInventory,
    inventory,
  } = useInventory();

  const { openSnackbarAction } = useSnackbar();

  const [addInventoryInOut, { isLoading }] = useInOutInventoryMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<InventoryInOut>({
    defaultValues: { increment: true, inventoryId: inventory.id },
    resolver: yupResolver(inventoryScheme),
  });

  const submitForm = async (data: InventoryInOut) => {
    console.log(888, data);
    try {
      const res = await addInventoryInOut(data).unwrap();
      openSnackbarAction({
        message: res.msg || `${t('created')}`,
        type: 'success',
      });
      reset();
      refresh();
      closeDialog();
    } catch (e) {
      console.log(666, e);
      // @ts-ignore
      const message = e?.data?.message || `${t('error_save')}`;
      openSnackbarAction({ message, type: 'error' });
    }
  };

  const handleClose = () => {
    closeDialog();
  };

  const closeDialog = () => {
    if (onClose) onClose();
    else closeModalInventoryAction();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={isOpenModalInventory}
      fullWidth
      maxWidth={'md'}
      TransitionComponent={SgTransition}
    >
      <SgDialogTitle id={'appointment-dialog'} onClose={closeDialog}>
        {t('create_inventory_in_out')}
      </SgDialogTitle>
      <form onSubmit={handleSubmit(submitForm)}>
        <DialogContent dividers>
          <div className="flex flex-row items-center">
            <SgCheckbox
              label={t('increment')}
              name="increment"
              control={control}
            />
            <SgInput
              className="flex-1 !m-3"
              name="quantity"
              control={control}
              errors={errors}
              label={t('quantity')}
              required
              type={'number'}
              size="small"
            />
          </div>
          <div className="flex flex-row items-center">
            <SgInput
              className="flex-1 !m-3"
              name="note"
              control={control}
              errors={errors}
              label={t('note')}
              required
              rows={5}
              size="small"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="warning"
            onClick={handleClose}
            className="mx-4"
          >
            Cerrar
          </Button>
          <SgButton
            variant="contained"
            color="primary"
            type="submit"
            label="Guardar"
            sending={isLoading}
          />
        </DialogActions>
      </form>
    </Dialog>
  );
};
