import 'react-datepicker/dist/react-datepicker.css';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Paper,
} from '@mui/material';
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
  useGetUserToListQuery,
  useUpdateAppointmentMutation,
} from '../redux/api/appointmentApi';
import useSnackbar from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { useGetCustomersQuery } from '../../customer/redux/api/customerApi';
import { defaultValuesFormAppointment } from '../AppointmentConst';
import useAppointment from '../redux/hooks/useAppointment';
import { t } from 'i18next';
import { AmountFormatCustom } from '../../../../helpers';
import { SgCheckbox } from '../../../../components/form/SgCheckbox';

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
  const { data: users } = useGetUserToListQuery('');
  const { data: customers } = useGetCustomersQuery('');

  const { openSnackbarAction } = useSnackbar();

  const [defaultValues, setDefaultValues] = useState<AppointmentDto>(
    appointment || defaultValuesFormAppointment
  );

  useEffect(() => {
    if (appointment) {
      setShowServiceFields(appointment.service != null);
      setStartDate(new Date(`${appointment.date}`));
      setDefaultValues({ ...appointment });
    } else {
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

  const handleClose = () => {
    closeDialog();
  };

  const [showServiceFields, setShowServiceFields] = useState(false);

  const handleClickAddService = (e: any) => {
    setShowServiceFields(e);
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
      if (data.id) {
        delete data.customer;
        delete data.appointmentType;
      }

      if (data.service) data.service.description = data.description;
      delete data.addService;
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
    } catch (e: any) {
      openSnackbarAction({
        message: e?.data?.message || `${t('error')}`,
        type: 'error',
      });
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
        {t(
          appointment?.appointmentTypeId
            ? 'edit_appointment'
            : 'add_appointment'
        )}
      </SgDialogTitle>
      <form onSubmit={handleSubmit(submitForm)}>
        <DialogContent dividers>
          <div className="flex flex-col sm:flex-row items-center mb-4">
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
          <div className="flex flex-col sm:flex-row items-center mb-4">
            <SgInput
              className="flex-1 !m-3"
              name={'name'}
              control={control}
              errors={errors}
              label={t('name_appointment')}
              size="small"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center mb-4">
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
          <div className="flex flex-col sm:flex-row items-center mb-4">
            <SgSelect
              key="user-select"
              control={control}
              name="assignedToId"
              label={t('assigned_to')}
              fieldId="id"
              fieldLabel="name"
              className="flex-1 !m-3"
              size="small"
              errors={errors}
              defaultValue={appointment?.assignedToId || ''}
              options={users?.data}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center mb-4">
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
            {/* {!appointment?.service && ( */}
            {/* )} */}
            <SgCheckbox
              disabled={!!appointment?.service}
              label={t('create_service')}
              onChange={handleClickAddService}
              name="addService"
              control={control}
              defaultChecked={false}
            />
          </div>

          {!!showServiceFields && (
            <Paper elevation={3} className=" p-2 m-4">
              <span> Datos del servicio </span>
              <Divider />
              <div className="flex flex-col sm:flex-row items-center mb-4">
                <SgSelect
                  disabled={!!appointment?.service}
                  key="statusService-select-appointment"
                  control={control}
                  name="service.typeId"
                  label={t('type')}
                  required
                  fieldId="id"
                  fieldLabel="name"
                  fieldDescription="description"
                  className="flex-1 !m-3"
                  size="small"
                  errors={errors}
                  list="typeService"
                />

                <SgInput
                  disabled={!!appointment?.service}
                  className="flex-1 !m-3"
                  name="service.amount"
                  control={control}
                  errors={errors}
                  label={t('amount')}
                  required
                  size="small"
                  InputProps={AmountFormatCustom}
                />

                <SgSelect
                  disabled={!!appointment?.service}
                  key="statusService-select"
                  control={control}
                  name="service.statusId"
                  label={t('status')}
                  required
                  fieldId="id"
                  fieldLabel="name"
                  fieldDescription="description"
                  className="flex-1 !m-3"
                  size="small"
                  errors={errors}
                  list="statusService"
                />
              </div>
            </Paper>
          )}

          <div className="flex flex-col sm:flex-row items-center mb-4">
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
