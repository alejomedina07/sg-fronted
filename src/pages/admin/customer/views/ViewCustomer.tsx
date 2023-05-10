import { Box, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { FormCustomer } from './FormCustomer';
import { t } from 'i18next';
import { useParams } from 'react-router-dom';
import { useGetCustomerByIdQuery } from '../redux/api/customerApi';
import { ViewServices } from '../../service/components/ViewServices';
import { SgTabPanel } from '../../../../components/utils/tabs/SgTabPanel';

export const ViewCustomer = () => {
  const { customerId } = useParams();
  const [value, setValue] = useState(0);
  const [customer, setCustomer] = useState();
  const [services, setServices] = useState();
  const [appointments, setAppointments] = useState();

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data } = useGetCustomerByIdQuery(customerId);

  useEffect(() => {
    if (data?.data) {
      const {
        customer: customerData,
        services: servicesData,
        appointments: appointmentsData,
      } = data.data;
      setCustomer(customerData);
      setServices(servicesData);
      setAppointments(appointmentsData);
    }
  }, [data]);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon position tabs example"
        >
          <Tab
            icon={<PermContactCalendarIcon />}
            iconPosition="start"
            label={t('edit_customer')}
          />
          <Tab
            icon={<MonetizationOnIcon />}
            iconPosition="start"
            label={t('service')}
          />
          <Tab
            icon={<CalendarMonthIcon />}
            iconPosition="start"
            label={t('apointment')}
          />
        </Tabs>
      </Box>
      <SgTabPanel value={value} index={0}>
        {!!customer && <FormCustomer customerEdit={customer} />}
      </SgTabPanel>
      <SgTabPanel value={value} index={1}>
        <ViewServices services={services ?? []} />
      </SgTabPanel>
      <SgTabPanel value={value} index={2}>
        Item Three
      </SgTabPanel>
    </>
  );
};
