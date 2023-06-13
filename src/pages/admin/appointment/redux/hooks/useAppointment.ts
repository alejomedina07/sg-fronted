import useGlobalStore from '../../../../../store/hooks/useGlobalStore';
import {
  appointmentSliceProps,
  changeRange,
  closeModalAppointment,
  openModalAppointment,
  openModalAppointmentProps,
  selectAppointment,
} from '../slices/appointmentSlice';

function useAppointment() {
  const { dispatch, useTypedSelector } = useGlobalStore();
  const { appointment, isOpenModalAppointment, refresh, onClose } =
    useTypedSelector(({ core }: any) => core.appointment);

  const changeRangeAction = (payload: appointmentSliceProps) =>
    dispatch(changeRange(payload));

  const selectAppointmentAction = (payload: any) =>
    dispatch(selectAppointment(payload));

  const closeModalAppointmentAction = () => dispatch(closeModalAppointment());

  const openModalAppointmentAction = (data: openModalAppointmentProps) =>
    dispatch(openModalAppointment(data));

  return {
    appointment,
    changeRangeAction,
    closeModalAppointmentAction,
    isOpenModalAppointment,
    openModalAppointmentAction,
    onClose,
    refresh,
    selectAppointmentAction,
  };
}

export default useAppointment;
