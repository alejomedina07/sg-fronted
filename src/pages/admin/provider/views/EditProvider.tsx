import { useParams } from 'react-router-dom';
import { Box, Tab, Tabs, Divider, Fab } from '@mui/material';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { t } from 'i18next';
import { SgTabPanel } from '../../../../components/utils/tabs/SgTabPanel';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { FormProvider } from './FormProvider';
import { useGetProviderByIdQuery } from '../redux/api/providerApi';
import AddCardIcon from '@mui/icons-material/AddCard';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { ListPaymentComponent } from '../components/payment/ListPaymentComponent';
import { SgTable } from '../../../../components/sgTable/SgTable';
import { ColumnsAccountsPayable } from '../helpers';
import { FormPaymentDialog } from '../components/payment/FormPaymentDialog';
import { SgButton } from '../../../../components/form/button/SgButton';

export const EditProvider = () => {
  const { providerId } = useParams();
  const [value, setValue] = useState(0);
  const [providerFormatter, setProviderFormatter] = useState<any>();
  const [openPayment, setOpenPayment] = useState(false);

  const columns = ColumnsAccountsPayable();

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data } = useGetProviderByIdQuery(providerId, {
    skip: !providerId,
  });

  useEffect(() => {
    if (data?.data) {
      const payments: any[] = [];

      data.data.accountPayables.forEach((account: any) => {
        account.paymentAccountPayables.forEach((item: any) => {
          payments.push(item.payment);
        });
      });
      console.log(777, payments);
      setProviderFormatter({
        ...data.data,
        payments,
      });
    }
  }, [data]);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {!!openPayment && (
          <FormPaymentDialog
            provider={providerFormatter}
            open={openPayment}
            handleClose={() => setOpenPayment(false)}
          />
        )}
        <Tabs value={value} onChange={handleChange} aria-label="Tabs ">
          <Tab
            icon={<PermContactCalendarIcon />}
            iconPosition="start"
            label={t('edit_provider')}
          />
          <Tab
            icon={<AddCardIcon />}
            iconPosition="start"
            label={t('accounts_payable')}
          />
          <Tab
            icon={<PriceCheckIcon />}
            iconPosition="start"
            label={t('payments')}
          />
        </Tabs>
      </Box>
      <SgTabPanel value={value} index={0} className="bg-white">
        {!!providerId && data?.data && <FormProvider provider={data.data} />}
      </SgTabPanel>
      <SgTabPanel value={value} index={1} className="bg-white">
        {!!providerFormatter?.accountPayables?.length && (
          <>
            <SgTable
              autoHeight
              columns={columns}
              data={providerFormatter?.accountPayables || []}
              isLoading={false}
            />
          </>
        )}
      </SgTabPanel>
      <SgTabPanel value={value} index={2} className="bg-white">
        <i>Pagos</i>
        {!!providerFormatter?.payments?.length && (
          <ListPaymentComponent
            paymentsData={providerFormatter?.payments || []}
          />
        )}
      </SgTabPanel>
      <div className="flex flex-row items-center justify-center">
        <Fab
          variant="extended"
          size="small"
          color="primary"
          onClick={() => setOpenPayment(true)}
        >
          <PriceCheckIcon sx={{ mr: 1 }} />
          {t('create_payment')}
        </Fab>
      </div>
    </>
  );
};
