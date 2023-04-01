import useGlobalStore                                            from '../../../../../store/hooks/useGlobalStore';
import {
  appointmentSliceProps,
  changeRange,
  closeModalAppointment,
  selectAppointment
} from '../slices/appointmentSlice';

function useAppointment() {
  const { dispatch, useTypedSelector } = useGlobalStore();
  const { appointment } = useTypedSelector(({ core }: any) => core.appointment);

  const changeRangeAction = (payload: appointmentSliceProps) => dispatch( changeRange( payload ) )

  const selectAppointmentAction = (payload: appointmentSliceProps) => dispatch( selectAppointment( payload ) )

  const closeModalAppointmentAction = () => dispatch( closeModalAppointment() )


  return {
    appointment,
    changeRangeAction,
    closeModalAppointmentAction,
    selectAppointmentAction
  }

}

export default useAppointment;