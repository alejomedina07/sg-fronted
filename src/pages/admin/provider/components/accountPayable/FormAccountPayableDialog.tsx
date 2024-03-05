import { SgTransition } from '../../../../../components/utils/dialogs/SgTransition';
import { SgDialogTitle } from '../../../../../components/utils/dialogs/SgDialogTitle';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { SgButton } from '../../../../../components/form/button/SgButton';
import { useTranslation } from 'react-i18next';
import { SgInput } from '../../../../../components/form/SgInput';
import React, { useState } from 'react';
import useSnackbar from '../../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { accountPayableScheme } from '../../validation/accountPayableScheme';
import {
  useAddAccountPayableMutation,
  useGetProvidersQuery,
} from '../../redux/api/providerApi';
import { AmountFormatCustom } from '../../../../../helpers';
import DatePicker from 'react-datepicker';
import { SgAutocomplete } from '../../../../../components/form/SgAutocomplete';

interface FormAccountPayableProps {
  provider?: any;
  open: boolean;
  handleClose: () => void;
}

export const FormAccountPayableDialog = (props: FormAccountPayableProps) => {
  const { provider, open, handleClose } = props;
  const { t } = useTranslation();
  const { openSnackbarAction } = useSnackbar();
  const [addAccountPayable] = useAddAccountPayableMutation();
  const [startDate, setStartDate] = useState<Date | null>();
  const { data: providers } = useGetProvidersQuery('?list=true');

  // console.log(999, providers);
  const handleChangeDate = (event: Date | null) => {
    setValue('maxDateOfPay', event);
    setStartDate(event);
  };

  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(accountPayableScheme),
  });

  const submitForm = async (data: any) => {
    try {
      console.log(data);
      const res = await addAccountPayable(
        provider?.id
          ? {
              ...data,
              providerId: provider.id,
            }
          : data
      ).unwrap();
      openSnackbarAction({
        message: res.msg || `${t('created')}`,
        type: 'success',
      });
      handleClose();
    } catch (e: any) {
      openSnackbarAction({
        message: e?.data?.message || `${t('error_save')}`,
        type: 'error',
      });
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth={'md'}
      TransitionComponent={SgTransition}
    >
      <SgDialogTitle id={'accountPayable-dialog'} onClose={handleClose}>
        {t('create_account_payable')}
      </SgDialogTitle>
      <form onSubmit={handleSubmit(submitForm)}>
        <DialogContent dividers>
          <div className="flex flex-row items-center !m-3">
            {!provider?.id && (
              <span className="flex-1">
                <SgAutocomplete
                  name="providerId"
                  label={t('select_provider')}
                  optionName="name"
                  optionValue="id"
                  size="small"
                  // required
                  errors={errors}
                  options={providers?.data || []}
                  control={control}
                />
              </span>
            )}
          </div>
          <div className="flex flex-row items-center">
            <SgInput
              className="flex-1 !m-3"
              name="reference"
              control={control}
              errors={errors}
              label={t('reference')}
              required
              size="small"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center">
            <SgInput
              className="flex-1 !m-3"
              name="amount"
              control={control}
              errors={errors}
              label={t('amount')}
              required
              size="small"
              InputProps={AmountFormatCustom}
            />
            <span className="flex-1 !m-3 border rounded border-gray-300 pr-2">
              <DatePicker
                selected={startDate}
                onChange={handleChangeDate}
                placeholderText={`${t('max_date_of_day')}`}
                className="m-2 w-full"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                locale="es"
              />
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center">
            <SgInput
              className="flex-1 !m-3"
              name="description"
              control={control}
              errors={errors}
              label={t('description')}
              required
              size="small"
              rows={4}
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
            {t('close')}
          </Button>
          <SgButton
            variant="contained"
            color="primary"
            label={t('save')}
            // sending={isLoading}
            type="submit"
          />
        </DialogActions>
      </form>
    </Dialog>
  );
};
