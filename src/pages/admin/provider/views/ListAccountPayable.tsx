import { ViewTitle } from '../../components/share/title/ViewTitle';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider } from '@mui/material';
import { ListAccountPayableComponent } from '../components/accountPayable/ListAccountPayableComponent';
import { FormAccountPayableDialog } from '../components/accountPayable/FormAccountPayableDialog';
import { SgButton } from '../../../../components/form/button/SgButton';
import { FormPaymentDialog } from '../components/payment/FormPaymentDialog';
import useSnackbar from '../../../../store/hooks/notifications/snackbar/useSnackbar';

export const ListAccountPayable = () => {
  const { t } = useTranslation();
  const [openAccountPayable, setOpenAccountPayable] = useState(false);
  const [rowSelected, setRowSelected] = useState<any>([]);
  const [providerSelected, setProviderSelected] = useState<any>();
  const [openPayment, setOpenPayment] = useState(false);
  const { openSnackbarAction } = useSnackbar();

  const handleClose = () => {
    setOpenAccountPayable(false);
  };

  const handleClosePayment = () => {
    setProviderSelected(null);
    setOpenPayment(false);
  };

  const handlePaymentMultiple = () => {
    try {
      const firstProviderId = rowSelected[0].providerId;
      const sameProvider = rowSelected.every(
        (item: any) => item.providerId === firstProviderId
      );
      if (!sameProvider) throw { message: 'providers_different' };
      setOpenPayment(true);
    } catch (e: any) {
      openSnackbarAction({
        message: e?.message || `${t('error_general')}`,
        type: 'error',
      });
    }
  };

  return (
    <>
      <ViewTitle title={t('list_account_payable')}>
        <SgButton
          variant="contained"
          color="primary"
          onClickAction={() => setOpenAccountPayable(true)}
          label={t('create_account_payable')}
        />
      </ViewTitle>
      <Divider />
      <br />{' '}
      <div className="flex flex-row items-center mb-4">
        <span className="mr-4">
          {' '}
          {t('accounts_payable_selected')} : <b> {rowSelected.length} </b>{' '}
        </span>
        <SgButton
          variant="contained"
          color="primary"
          onClickAction={handlePaymentMultiple}
          label={t('create_payment')}
          disabled={!rowSelected?.length}
        />
      </div>
      <ListAccountPayableComponent
        payment={openPayment}
        modal={openAccountPayable}
        setRowSelected={setRowSelected}
      />
      <FormAccountPayableDialog
        open={openAccountPayable}
        handleClose={handleClose}
      />
      {!!rowSelected?.length && openPayment && (
        <FormPaymentDialog
          provider={providerSelected}
          open={openPayment}
          handleClose={handleClosePayment}
          accountPayableSelected={rowSelected}
        />
      )}
    </>
  );
};
