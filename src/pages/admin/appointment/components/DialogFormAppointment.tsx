import 'react-datepicker/dist/react-datepicker.css';
import { useState }                                     from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { SgTransition }                 from '../../../../components/utils/dialogs/SgTransition';
import { SgDialogTitle }                                         from '../../../../components/utils/dialogs/SgDialogTitle';
import DatePicker, { registerLocale }                            from 'react-datepicker';
import es                                                        from 'date-fns/locale/es';
import { useForm }                                               from 'react-hook-form';
import { yupResolver }                                           from '@hookform/resolvers/yup';
import { defaultValuesFormAppointment }                          from '../AppointmentConst';
import { appointmentSchema }                                     from '../validation/appointmentSchema';
import { SgInput }                                               from '../../../../components/form/SgInput';
import { SgSelect }                                              from '../../../../components/form/SgSelect';
import { SgButton }                                              from '../../../../components/form/button/SgButton';
import { useAddAppointmentMutation, useGetAppointmentTypeQuery } from '../redux/api/appointmentApi';
import useSnackbar
                                                                 from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import {t} from 'i18next';


registerLocale('es', es)


export interface DialogFormAppointmentProps {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}

export const DialogFormAppointment = (props: DialogFormAppointmentProps) => {
  const { onClose, open, refetch } = props;
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [ addAppointment, { isLoading:isLoadingData  } ] = useAddAppointmentMutation()
  const { openSnackbarAction } = useSnackbar();

  const { data:appointmentTypes, isLoading:appointmentTypesLoading } = useGetAppointmentTypeQuery('')


  const { register, setValue, handleSubmit, control, formState:{ errors }, reset } = useForm<AppointmentDto>( {
    defaultValues: defaultValuesFormAppointment,
    resolver: yupResolver(appointmentSchema)
  });

  const handleClose = () => {
    onClose();
  };

  const handleChangeDate = (event: Date | null) => {
    setValue('date', event)
    setStartDate(event)
  };

  const submitForm = async(data: object) => {
    try {
      const res = await addAppointment( data ).unwrap();
      openSnackbarAction({ messageAction: res.msg || `${t('created')}`, typeAction: 'success' })
      refetch();
      reset();
      onClose();
    } catch (e) {
      openSnackbarAction({ messageAction: `${t('error_save')}`, typeAction: 'error' })
    }
  }


  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'md'} TransitionComponent={SgTransition}>
      <SgDialogTitle id={'appointment-dialog'} onClose={onClose}>{t('add_appointment')} </SgDialogTitle>
      <form onSubmit={handleSubmit(submitForm)}>
        <DialogContent dividers>
          <div className="flex flex-row items-center mb-4">
            <span className="pl-4">{t('date')}: </span>
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
              label={t('appointment_duration')}
              required
              size="small"
            />
          </div>
          <div className="flex flex-row items-center mb-4">
            <SgInput
              className="flex-1 !m-3"
              name="name"
              control={control}
              errors={errors}
              label={t('appointment_name')}
              size="small"
            />
          </div>
          <div className="flex flex-row items-center mb-4">
            <SgSelect
              key="appointmentType-select"
              control={control}
              name='appointmentTypeId'
              label={t('appointment_type')}
              fieldId='id'
              fieldLabel='name'
              className="flex-1 !m-3"
              size='small'
              errors={errors}
              options={appointmentTypes?.data}
            />
          </div>

          <div className="flex flex-row items-center mb-4">
            <SgSelect
              key="customerId-select"
              control={control}
              name='customerId'
              label={t('customer')}
              fieldId='value'
              fieldLabel='value'
              className="flex-1 !m-3"
              size='small'
              errors={errors}
              options={[]}
            />
          </div>
          <div className="flex flex-row items-center mb-4">
            <SgInput
              className="flex-1 !m-3"
              name="description"
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
          <Button  variant="outlined" color="warning" onClick={handleClose} className="mx-4" >{t('close')}</Button>
          <SgButton variant="contained" color="primary" type="submit" label={t('save')} sending={isLoadingData}/>
        </DialogActions>
      </form>


    </Dialog>
  );
};
