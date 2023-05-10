import useGlobalStore from '../../../../../store/hooks/useGlobalStore';
import {
  serviceSliceProps,
  closeModalService,
  openModalService,
  openModalServiceProps,
  selectService,
  selectCustomer,
} from '../slices/serviceSlice';

function useService() {
  const { dispatch, useTypedSelector } = useGlobalStore();
  const { service, isOpenModalService, refresh, onClose, customer } =
    useTypedSelector(({ core }: any) => core.service);

  const selectServiceAction = (payload: serviceSliceProps) =>
    dispatch(selectService(payload));

  const selectCustomerAction = (payload: number) =>
    dispatch(selectCustomer(payload));

  const closeModalServiceAction = () => dispatch(closeModalService());

  const openModalServiceAction = (data: openModalServiceProps) =>
    dispatch(openModalService(data));

  return {
    service,
    closeModalServiceAction,
    customer,
    isOpenModalService,
    openModalServiceAction,
    onClose,
    refresh,
    selectCustomerAction,
    selectServiceAction,
  };
}

export default useService;
