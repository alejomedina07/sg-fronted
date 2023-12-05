import { Paper, Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import { t } from 'i18next';
import { SgLink } from '../../../../../components/form/button/SgLink';
import { useGetAllOptionsQuery } from '../../../../../store/apis/listApi';
import { useGetAppointmentTypeQuery } from '../../../appointment/redux/api/appointmentApi';
import SettingsIcon from '@mui/icons-material/Settings';

export const ConfigOptions = () => {
  const { data: options, isLoading } = useGetAllOptionsQuery('');
  console.log(11, options);

  // const { data, isLoading } = useGetAppointmentTypeQuery('');
  // console.log('data:', data);

  return (
    <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 xs:gap-1 sm:gap-2 md:gap-3">
      {options?.data?.map(
        (option: string) =>
          !!isLoading && (
            <Skeleton
              variant="rectangular"
              className="flex-1 h-40 p-2 m-4"
              height={150}
              key={option}
            />
          )
      )}
      {options?.data?.map(
        (option: string) =>
          !isLoading && (
            <Paper elevation={3} className="flex-1 h-40 p-2 m-4" key={option}>
              <div className="h-full flex flex-col items-center">
                <b>{t(option)}</b>
                <span className="flex-1" />
                <SettingsIcon sx={{ fontSize: 50 }} />
                <span className="flex-1" />
                <SgLink
                  label={t('see')}
                  to={`/admin/config/config-list/${option}`}
                  classes="w-full"
                />
              </div>
            </Paper>
          )
      )}
      <Paper elevation={3} className="flex-1 h-40 p-2 m-4" key={1}>
        <div className="h-full flex flex-col items-center">
          <b>{t('appointment_types')}</b>
          <span className="flex-1" />
          <SettingsIcon sx={{ fontSize: 50 }} />
          <span className="flex-1" />
          <SgLink
            label={t('see')}
            to={`/admin/appointment-type`}
            classes="w-full"
          />
        </div>
      </Paper>
      <Paper elevation={3} className="flex-1 h-40 p-2 m-4" key={199}>
        <div className="h-full flex flex-col items-center">
          <b>{t('rol')}</b>
          <span className="flex-1" />
          <SettingsIcon sx={{ fontSize: 50 }} />
          <span className="flex-1" />
          <SgLink label={t('see')} to={`/admin/config/rol`} classes="w-full" />
        </div>
      </Paper>
    </div>
  );
};
