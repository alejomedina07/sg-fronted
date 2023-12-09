import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  Radio,
} from '@mui/material';
import useInventory from '../redux/hooks/useInventory';
import { inventoryScheme } from '../validation/inventoryInOutScheme';
import { SgTransition } from '../../../../components/utils/dialogs/SgTransition';
import { SgDialogTitle } from '../../../../components/utils/dialogs/SgDialogTitle';
import { SgButton } from '../../../../components/form/button/SgButton';
import { useInOutInventoryMutation } from '../redux/api/inventoryApi';
import { SgInput } from '../../../../components/form/SgInput';
import useSnackbar from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { ChangeEvent, useState } from 'react';
import { red, blue } from '@mui/material/colors';

export const InventoryInOut = () => {
  const {
    onClose,
    refresh,
    closeModalInventoryAction,
    isOpenModalInventory,
    inventory,
  } = useInventory();

  const { openSnackbarAction } = useSnackbar();
  const [selectedValue, setSelectedValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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
      if (selectedValue === '') {
        setErrorMessage(`${t('field_is_required')}`);
        return;
      } else if (selectedValue === 'increment') data.increment = true;
      else data.increment = false;
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

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
            <Paper
              elevation={3}
              className={`flex-1 h-30 p-2 m-4 ${
                selectedValue === 'increment' ? 'border-blue-500 border-2' : ''
              }`}
            >
              <div
                className="h-full flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedValue('increment')}
              >
                <span> {t('increment')} </span>
                <span className="flex-1" />
                <Radio
                  {...controlProps('increment')}
                  color="primary"
                  sx={{
                    color: blue[800],
                    '&.Mui-checked': {
                      color: blue[600],
                    },
                  }}
                />
              </div>
            </Paper>
            <Paper
              elevation={3}
              className={`flex-1 h-30 p-2 m-4 ${
                selectedValue === 'decrement' ? 'border-red-600 border-2' : ''
              }`}
            >
              <div
                className="h-full flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedValue('decrement')}
              >
                <span> {t('decrement')} </span>
                <span className="flex-1" />
                <Radio
                  {...controlProps('decrement')}
                  color="error"
                  sx={{
                    color: red[800],
                    '&.Mui-checked': {
                      color: red[600],
                    },
                  }}
                />
              </div>
            </Paper>
          </div>
          <div className="flex flex-row items-center justify-center">
            <span className="text-red-600"> {errorMessage}</span>
          </div>

          <div className="flex flex-row items-center">
            {/* <SgCheckbox */}
            {/*   label={t('increment')} */}
            {/*   name="increment" */}
            {/*   control={control} */}
            {/* /> */}
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
