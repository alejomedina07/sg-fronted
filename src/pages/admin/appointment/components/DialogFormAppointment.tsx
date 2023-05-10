import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { SgTransition } from '../../../../components/utils/dialogs/SgTransition';
import { SgDialogTitle } from '../../../../components/utils/dialogs/SgDialogTitle';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { appointmentSchema } from '../validation/appointmentSchema';
import { SgInput } from '../../../../components/form/SgInput';
import { SgSelect } from '../../../../components/form/SgSelect';
import { SgButton } from '../../../../components/form/button/SgButton';
import {
  useAddAppointmentMutation,
  useGetAppointmentTypeQuery,
  useUpdateAppointmentMutation,
} from '../redux/api/appointmentApi';
import useSnackbar from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useGetCustomersQuery } from '../../customer/redux/api/customerApi';
import { defaultValuesFormAppointment } from '../AppointmentConst';
import useAppointment from '../redux/hooks/useAppointment';
import { t } from 'i18next';

registerLocale('es', es);

export const DialogFormAppointment = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const {
    isOpenModalAppointment,
    appointment,
    onClose,
    refresh,
    closeModalAppointmentAction,
  } = useAppointment();
  const [addAppointment, { isLoading: isLoadingData }] =
    useAddAppointmentMutation();
  const [updateAppointment] = useUpdateAppointmentMutation();
  const { data: appointmentTypes } = useGetAppointmentTypeQuery('');
  const { data: customers } = useGetCustomersQuery('');

  const { openSnackbarAction } = useSnackbar();

  const [defaultValues, setDefaultValues] = useState<AppointmentDto>(
    appointment || defaultValuesFormAppointment
  );

  useEffect(() => {
    console.log(789);
    if (appointment) {
      console.log('useEffect', appointment);
      setStartDate(new Date(`${appointment.date}`));
      setDefaultValues({ ...appointment });
    } else {
      console.log('defaultValuesFormAppointment');
      setDefaultValues({ ...defaultValuesFormAppointment });
    }
  }, [appointment, isOpenModalAppointment]);

  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(appointmentSchema),
  });

  console.log(789, errors);

  const handleClose = () => {
    closeDialog();
  };

  const closeDialog = () => {
    if (onClose) onClose();
    else closeModalAppointmentAction();
  };

  const handleChangeDate = (event: Date | null) => {
    setValue('date', event);
    setStartDate(event);
  };

  const submitForm = async (data: AppointmentDto) => {
    try {
      console.log('data:::: ', data);
      if (data.id) {
        delete data.customer;
        delete data.appointmentType;
      }
      const res = data.id
        ? await updateAppointment(data).unwrap()
        : await addAppointment(data).unwrap();
      openSnackbarAction({
        message: res.msg || `${t('created')}`,
        type: 'success',
      });
      refresh();
      reset();
      closeDialog();
    } catch (e) {
      openSnackbarAction({ message: `${t('error')}`, type: 'error' });
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={isOpenModalAppointment}
      fullWidth
      maxWidth={'md'}
      TransitionComponent={SgTransition}
    >
      <SgDialogTitle id={'appointment-dialog'} onClose={onClose}>
        {' '}
        {t('add_appointment')}
      </SgDialogTitle>
      <form onSubmit={handleSubmit(submitForm)}>
        <DialogContent dividers>
          <div className="flex flex-row items-center mb-4">
            <span className="pl-4">Fecha: </span>
            <span className="flex-1 !m-3 border rounded border-gray-300 pr-3">
              <DatePicker
                selected={startDate}
                onChange={handleChangeDate}
                dateFormat="Pp"
                className="m-2 w-full"
                showTimeSelect
                locale="es"
                timeCaption="Hora"
              />
            </span>
            <SgInput
              className="flex-1 !m-3"
              name="duration"
              type="number"
              control={control}
              errors={errors}
              label={t('duration_appointment')}
              required
              size="small"
            />
          </div>
          <div className="flex flex-row items-center mb-4">
            <SgInput
              className="flex-1 !m-3"
              name={'name'}
              control={control}
              errors={errors}
              label={t('name_appointment')}
              size="small"
            />
          </div>
          <div className="flex flex-row items-center mb-4">
            <SgSelect
              key="appointmentType-select"
              control={control}
              name="appointmentTypeId"
              label={t('appointment_type')}
              fieldId="id"
              fieldLabel="name"
              className="flex-1 !m-3"
              size="small"
              errors={errors}
              defaultValue={appointment?.appointmentTypeId || ''}
              options={appointmentTypes?.data}
            />
          </div>

          <div className="flex flex-row items-center mb-4">
            <SgSelect
              key="appointmentType-select"
              control={control}
              name="customerId"
              label={t('customer_id')}
              fieldId="id"
              fieldLabel="name"
              className="flex-1 !m-3"
              defaultValue={appointment?.customerId || ''}
              size="small"
              errors={errors}
              options={customers?.data || []}
            />
          </div>
          <div className="flex flex-row items-center mb-4">
            <SgInput
              className="flex-1 !m-3"
              name={'description'}
              control={control}
              errors={errors}
              label={t('description')}
              size="small"
              multiline
              rows={4}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="warning"
            onClick={handleClose}
            className="mx-4"
          >
            Cerrar
          </Button>
          <SgButton
            variant="contained"
            color="primary"
            type="submit"
            label={t('save')}
            sending={isLoadingData}
          />
        </DialogActions>
      </form>
    </Dialog>
  );
};
