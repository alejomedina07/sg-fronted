import { SgButton } from '../../../../../components/form/button/SgButton';
import { ViewTitle } from '../../../components/share/title/ViewTitle';
import { SgLink } from '../../../../../components/form/button/SgLink';
import { SgInput } from '../../../../../components/form/SgInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useSnackbar from '../../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useNavigate, useParams } from 'react-router-dom';
import { defaultValues } from '../helpers/appointmentTypeConst';
import { appointmentTypeScheme } from '../validation/appointmentTypeScheme';
import {
  useAddAppointmentTypeMutation,
  useGetAppointmentTypeQuery,
  useUpdateAppointmentTypeMutation,
} from '../../../appointment/redux/api/appointmentApi';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';
import { t } from 'i18next';
import useForms from '../../../../../store/hooks/form/useForms';
import { useEffect, useState } from 'react';

export const FormAppointmentType = () => {
  const { appointmentTypeId } = useParams();
  const { appointmentTypeEdit } = useForms();
  const [defaultValuesActive, setDefaultValuesActive] =
    useState<AppointmentType>();
  const { openSnackbarAction } = useSnackbar();
  const navigate = useNavigate();
  const [addAppointmentType, { isLoading }] = useAddAppointmentTypeMutation();
  const [updateAppointmentType] = useUpdateAppointmentTypeMutation();
  const { data: appointmentTypeData, isLoading: isLoadingAppointmentType } =
    useGetAppointmentTypeQuery('');

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<AppointmentType>({
    defaultValues: defaultValuesActive,
    resolver: yupResolver(appointmentTypeScheme),
  });
  console.log('appointment type errors', errors);

  console.log(defaultValuesActive);

  useEffect(() => {
    if (
      appointmentTypeId &&
      appointmentTypeEdit &&
      appointmentTypeId === `${appointmentTypeEdit.id}`
    ) {
      setDefaultValuesActive(appointmentTypeEdit);
    } else {
      setDefaultValuesActive(defaultValues);
    }
  }, [appointmentTypeId, appointmentTypeEdit]);

  useEffect(() => {
    reset(defaultValuesActive);
  }, [defaultValuesActive, reset]);


  const submitForm = async (data: any) => {
    try {
      console.log(432);
      let res;
      if (data.id) res = await updateAppointmentType(data).unwrap();
      else res = await addAppointmentType(data).unwrap();
      openSnackbarAction({
        message: res.msg || `${t('created')}`,
        type: 'success',
      });
      navigate('/admin/appointment-type');
    } catch (e) {
      openSnackbarAction({ message: `${t('error_save')}`, type: 'error' });
    }
  };

  return (
    <>
      <ViewTitle title={t('create_appointment_type')}>
        <SgLink
          label={t('list_appointment_type')}
          to="/admin/appointment-type"
        />
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
              /* defaultValue={ appointmentTypeEdit?.start || '' } */
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
          <SgButton
            variant="contained"
            color="primary"
            type="submit"
            label={t('save')}
            sending={isLoading}
          />
        </div>
      </form>
    </>
  );
};
