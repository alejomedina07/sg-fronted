import { SgButton }               from '../../../../../components/form/button/SgButton';
import { ViewTitle }              from '../../../components/share/title/ViewTitle';
import { SgLink }                 from '../../../../../components/form/button/SgLink';
import { SgInput }                from '../../../../../components/form/SgInput';
import { useForm }                from 'react-hook-form';
import { yupResolver }            from '@hookform/resolvers/yup';
import useSnackbar                from '../../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useNavigate }            from 'react-router-dom';
import {defaultValues} from '../helpers/appointmentTypeConst';
import {appointmentTypeScheme} from '../validation/appointmentTypeScheme';
import {useAddAppointmentTypeMutation, useGetAppointmentTypeQuery} from '../../../appointment/redux/api/appointmentApi';
import Switch from '@mui/material/Switch';
import {FormControlLabel} from '@mui/material';
import { t }                                                         from 'i18next';


export const FormAppointmentType = () => {
  const {handleSubmit, control, formState: {errors}} = useForm<AppointmentType>({
    defaultValues,
    resolver: yupResolver(appointmentTypeScheme)
  });
  const {openSnackbarAction} = useSnackbar();
  const navigate = useNavigate();


  const [addAppointmentType, {isLoading}] = useAddAppointmentTypeMutation();
  const { data:appointmentTypeData, isLoading:isLoadingAppointmentType } = useGetAppointmentTypeQuery('')

  const submitForm = async (data: any) => {
    try {
      const res = await addAppointmentType(data).unwrap();
      openSnackbarAction({messageAction: res.msg || `${t('created')}`, typeAction: 'success'})
      navigate('/admin/appointment-type')
    } catch (e) {
      openSnackbarAction({messageAction: `${t('error_save')}`, typeAction: 'error'})
    }
  }

  return (
    <>
      <ViewTitle title={t('create_appointment_type')}>
      <SgLink label={t('list_appointment_type')} to="/admin/appointment-type"/>
    </ViewTitle>
    <form onSubmit={handleSubmit(submitForm)}>
    {/* name status */}
    <div className="flex flex-row items-center">
  <SgInput
    className="flex-1 !m-3"
  name="name"
  control={control}
  errors={errors}
  label={t('name')}
  required
  size="small"
  />
      <div>
        <FormControlLabel
          value="start"
          control={<Switch color="primary" />}
          label={t('active')}
          labelPlacement="start"
        />
      </div>

    </div>
  {/* description  */}
  <div className="flex flex-row items-center">
  <SgInput
    className="flex-1 !m-3"
  name="description"
  control={control}
  errors={errors}
  label={t('description')}
  required
  size="small"
  />



    </div>
    <div className="mt-4 mb-4 flex flex-row items-end justify-end">
  <SgButton variant="contained" color="primary" type="submit" label={t('save')} sending={isLoading}/>
  </div>
  </form>
  </>
);
}
