import { useParams } from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { t } from 'i18next';
import { SgTabPanel } from '../../../../components/utils/tabs/SgTabPanel';
import React, { SyntheticEvent, useState } from 'react';
import { FormProvider } from './FormProvider';
import { useGetProviderByIdQuery } from '../redux/api/providerApi';
import AddCardIcon from '@mui/icons-material/AddCard';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

export const EditProvider = () => {
  const { providerId } = useParams();
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data } = useGetProviderByIdQuery(providerId, {
    skip: !providerId,
  });

  // console.log(123456, data);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="Tabs ">
          <Tab
            icon={<PermContactCalendarIcon />}
            iconPosition="start"
            label={t('edit_customer')}
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
        <i>segunda tab</i>
      </SgTabPanel>
      <SgTabPanel value={value} index={2} className="bg-white">
        <i>tercera tab</i>
      </SgTabPanel>
    </>
  );
};
