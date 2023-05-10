import {
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  Paper,
} from '@mui/material';
import Box from '@mui/material/Box';
import { t } from 'i18next';
import { SgLink } from '../../../../../components/form/button/SgLink';
import { useGetAllOptionsQuery } from '../../../../../store/apis/listApi';
import { useGetAppointmentTypeQuery } from '../../../appointment/redux/api/appointmentApi';

export const ConfigOptions = () => {
  const { data: options } = useGetAllOptionsQuery('');
  console.log(11, options);

  const getLabelList = (option: string) => {
    return t('view_list_of') + ' ' + t(`${option}`);
  };

  const { data, isLoading } = useGetAppointmentTypeQuery('');
  console.log('data:', data);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {options?.data?.map((option: string) => (
        <Paper elevation={3} className="flex-1 h-30 p-2 m-4" key={option}>
          <div className="h-full flex flex-col items-center">
            <b>{t(option)}</b>
            <span className="flex-1" />
            <SgLink
              label={t('see')}
              to={`/admin/config-list/${option}`}
              classes="w-full"
            />
          </div>
        </Paper>
      ))}
      <Paper elevation={3} className="flex-1 h-30 p-2 m-4" key={1}>
        <div className="h-full flex flex-col items-center">
          <b>{t('appointment_types')}</b>
          <span className="flex-1" />
          <SgLink
            label={t('see')}
            to={`/admin/appointment-type`}
            classes="w-full"
          />
        </div>
      </Paper>
    </Box>
  );
};
