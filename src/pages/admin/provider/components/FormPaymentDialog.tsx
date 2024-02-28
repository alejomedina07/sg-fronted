import { SgTransition } from '../../../../components/utils/dialogs/SgTransition';
import { SgDialogTitle } from '../../../../components/utils/dialogs/SgDialogTitle';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { SgButton } from '../../../../components/form/button/SgButton';
import { useTranslation } from 'react-i18next';
import { SgInput } from '../../../../components/form/SgInput';
import React, { useEffect, useState } from 'react';
import useSnackbar from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { paymentScheme } from '../validation/paymentScheme';
import {
  useAddPaymentMutation,
  useGetAccountsPayableQuery,
} from '../redux/api/providerApi';
import { AmountFormatCustom } from '../../../../helpers';
import { ListAccountPayableQuick } from './accountPayable/ListAccountPayableQuick';
import DatePicker from 'react-datepicker';

interface FormPaymentProps {
  provider: any;
  open: boolean;
  handleClose: () => void;
  accountPayableSelected?: any;
}

export const FormPaymentDialog = (props: FormPaymentProps) => {
  const { provider, open, handleClose, accountPayableSelected } = props;
  const [defaultValues, setDefaultValues] = useState<any>({});
  const [accountPayableToPay, setAccountPayableToPay] = useState<any>([]);
  const [providerSelected, setProviderSelected] = useState<any>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [paymentDate, setPaymentDate] = useState<Date | null>(new Date());
  const { t } = useTranslation();
  const { openSnackbarAction } = useSnackbar();
  const [addPayment] = useAddPaymentMutation();

  const { data, isLoading } = useGetAccountsPayableQuery(
    {
      pageSize: 2000,
      page: 1,
      filters: `&filters[providerId]=${provider?.id}&filters[paid]=false&filters[type]=AND`,
    },
    {
      skip: !provider,
    }
  );

  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(paymentScheme),
  });

  const handleChangeDate = (event: Date | null) => {
    setValue('paymentDate', event);
    setPaymentDate(event);
  };

  useEffect(() => {
    if (provider) setProviderSelected(provider);
  }, [provider]);

  useEffect(() => {
    if (accountPayableSelected?.length) {
      setProviderSelected(accountPayableSelected[0].provider);
      setDefaultValues({
        providerId: accountPayableSelected[0]?.providerId || null,
      });
      reset(defaultValues);
      let accountsToPay: any[] = [],
        totalPay = 0;
      accountPayableSelected.forEach((item: any) => {
        const pay =
          parseFloat(item.amount.replace('$', '')) -
          parseFloat(item.amountPaid.replace('$', ''));
        totalPay += pay;
        accountsToPay.push({ ...item, pay, maxPaid: pay });
      });
      setValue('amount', totalPay);
      setAccountPayableToPay([...accountsToPay]);
    } else if (data?.data.length) {
      let accountsToPay: any[] = [],
        totalPay = 0;
      data?.data.forEach((item: any) => {
        const pay =
          parseFloat(item.amount.replace('$', '')) -
          parseFloat(item.amountPaid.replace('$', ''));
        totalPay += pay;
        accountsToPay.push({ ...item, pay, maxPaid: pay });
      });
      setValue('amount', totalPay);
      setAccountPayableToPay([...accountsToPay]);
    }
  }, [accountPayableSelected, data]);

  useEffect(() => {
    if (accountPayableToPay.length) {
      let totalPay = 0;
      accountPayableToPay.forEach((item: any) => (totalPay += item.pay));
      setValue('amount', totalPay);
    }
  }, [accountPayableToPay]);

  const submitForm = async (data: any) => {
    try {
      console.log({
        payment: data,
        accountsPayable: accountPayableToPay.map((item: any) => {
          return { accountPayableId: item.id, amount: item.pay };
        }),
      });

      const res = await addPayment({
        payment: { ...data, paymentDate },
        accountsPayable: accountPayableToPay.map((item: any) => {
          return { accountPayableId: item.id, amount: item.pay };
        }),
      }).unwrap();
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
      maxWidth={'lg'}
      TransitionComponent={SgTransition}
    >
      <SgDialogTitle id={'payment-dialog'} onClose={handleClose}>
        {t('create_payment')}
      </SgDialogTitle>
      <form onSubmit={handleSubmit(submitForm)}>
        <DialogContent dividers>
          {!!providerSelected && (
            <div className="flex flex-row items-center sm:flex-row">
              <b>
                {' '}
                {t('provider')}: {providerSelected?.name}{' '}
              </b>
            </div>
          )}
          <div className="flex flex-row items-center sm:flex-row"></div>
          <div className="flex flex-col sm:flex-row items-center">
            <SgInput
              className="flex-1 !m-3"
              name="reference"
              control={control}
              errors={errors}
              label={t('reference')}
              required
              size="small"
            />
            <SgInput
              className="flex-1 !m-3"
              name="method"
              control={control}
              errors={errors}
              label={t('method')}
              required
              size="small"
            />
          </div>
          <div className="flex flex-row items-center">
            <SgInput
              className="flex-1 !m-3"
              name="amount"
              control={control}
              errors={errors}
              label={t('amount')}
              required
              disabled
              size="small"
              InputProps={AmountFormatCustom}
            />
            <div className="flex-1 !m-3 flex flex-row items-center">
              <span>fecha de pago</span>
              <span className="flex-1 !m-3 border rounded border-gray-300 pr-3">
                <DatePicker
                  selected={paymentDate}
                  onChange={handleChangeDate}
                  dateFormat="P"
                  className="m-2 w-full"
                  showTimeSelect
                  locale="es"
                  timeCaption="Hora"
                />
              </span>
            </div>
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
          {!!accountPayableToPay?.length && (
            <ListAccountPayableQuick
              data={accountPayableToPay}
              setData={setAccountPayableToPay}
              setEditMode={setIsEditMode}
            />
          )}
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
            disabled={isEditMode || !accountPayableToPay?.length}
          />
        </DialogActions>
      </form>
    </Dialog>
  );
};
