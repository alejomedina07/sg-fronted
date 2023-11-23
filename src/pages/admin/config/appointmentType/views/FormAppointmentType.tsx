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
import { t } from 'i18next';
import useForms from '../../../../../store/hooks/form/useForms';
import { useEffect, useState } from 'react';
import { SgSwitch } from '../../../../../components/form/button/SgSwitch';

export const FormAppointmentType = () => {
  const { appointmentTypeId } = useParams();
  const { appointmentTypeEdit } = useForms();
  const [defaultValuesActive, setDefaultValuesActive] =
    useState<AppointmentType>();
  const { openSnackbarAction } = useSnackbar();
  const navigate = useNavigate();
  const [addAppointmentType, { isLoading }] = useAddAppointmentTypeMutation();
  const [updateAppointmentType] = useUpdateAppointmentTypeMutation();
  // const { data: appointmentTypeData, isLoading: isLoadingAppointmentType } =
  //   useGetAppointmentTypeQuery('');

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<AppointmentType>({
    defaultValues: defaultValuesActive,
    resolver: yupResolver(appointmentTypeScheme),
  });

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
      console.log(432, data);
      let res;
      if (data.id)
        res = await updateAppointmentType({
          id: data.id,
          name: data.name,
          description: data.description,
          status: data.status,
        }).unwrap();
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

  const handleSwitchChange = (value: boolean) => {
    console.log('Switch value:', value);

    // Realiza acciones adicionales según el valor del switch
  };

  return (
    <>
      <ViewTitle
        title={t(
          appointmentTypeId
            ? 'edit_appointment_type'
            : 'create_appointment_type'
        )}
      >
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
            <SgSwitch
              label={t('status')}
              name="status"
              control={control}
              // onChange={handleSwitchChange}
              defaultChecked={appointmentTypeEdit?.status || true}
            />
            {/* <FormControlLabel */}
            {/*   value="start" */}
            {/*   control={<Switch color="primary" />} */}
            {/*   label={t('active')} */}
            {/*    defaultValue={ appointmentTypeEdit?.start || '' }  */}
            {/*   labelPlacement="start" */}
            {/* /> */}
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
