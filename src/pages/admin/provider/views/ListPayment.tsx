import { ViewTitle } from '../../components/share/title/ViewTitle';
import { SgButton } from '../../../../components/form/button/SgButton';
import { Autocomplete, Chip, Divider, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormPaymentDialog } from '../components/payment/FormPaymentDialog';
import { ListPaymentComponent } from '../components/payment/ListPaymentComponent';
import { useGetProvidersQuery } from '../redux/api/providerApi';

export const ListPayment = () => {
  const [openPayment, setOpenPayment] = useState(false);
  const { t } = useTranslation();
  const { data: providers } = useGetProvidersQuery('?list=true');
  const handleClose = () => {
    setOpenPayment(false);
  };

  const [providerSelected, setProviderSelected] = useState<any | null>(null);

  return (
    <>
      <ViewTitle title={t('list_payments')}>
        <span className="flex-1"></span>
        <Autocomplete
          className="!mr-4 flex-1"
          id="fixed-tags-demo"
          value={providerSelected}
          size="small"
          onChange={(event, newValue) => {
            setProviderSelected(newValue);
          }}
          options={providers?.data || []}
          getOptionLabel={(option: any) => option.name}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option: any, index) => (
              <Chip label={option.name} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('select_provider')}
              placeholder={t('select_provider') || ''}
            />
          )}
        />
        <SgButton
          variant="contained"
          color="primary"
          onClickAction={() => setOpenPayment(true)}
          label={t('create_payment')}
          disabled={!providerSelected}
        />
      </ViewTitle>
      <Divider />
      {!openPayment && <ListPaymentComponent />}
      {!!openPayment && (
        <FormPaymentDialog
          provider={providerSelected}
          open={openPayment}
          handleClose={handleClose}
        />
      )}
    </>
  );
};
