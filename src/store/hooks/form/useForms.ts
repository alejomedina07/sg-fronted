import useGlobalStore from '../useGlobalStore';
import {
  setAppointmentTypeEdit,
  setCustomerEdit,
  setExpenseEdit,
  setInventoryEdit,
  setServiceEdit,
  setConfigFormEdit,
  setUserEdit,
} from '../../slices/formSlice';

function useForms() {
  const { dispatch, useTypedSelector } = useGlobalStore();

  const {
    userEdit,
    customerEdit,
    expenseEdit,
    inventoryEdit,
    appointmentTypeEdit,
    serviceEdit,
    configFormEdit,
  } = useTypedSelector(({ core }: any) => core.forms);

  const setUserEditAction = (user: User) => dispatch(setUserEdit(user));

  const setCustomerEditAction = (customer: Customer) =>
    dispatch(setCustomerEdit(customer));

  const setExpenseEditAction = (expense: Expense) =>
    dispatch(setExpenseEdit(expense));

  const setServiceEditAction = (service: Service) =>
    dispatch(setExpenseEdit(service));

  const setInventoryEditAction = (inventory: Inventory) =>
    dispatch(setInventoryEdit(inventory));

  const setAppointmentTypeEditAction = (appointmentType: AppointmentType) =>
    dispatch(setAppointmentTypeEdit(appointmentType));

  const setConfigFormEditAction = (configForm: OptionsList) =>
    dispatch(setConfigFormEdit(configForm));

  return {
    customerEdit,
    userEdit,
    expenseEdit,
    inventoryEdit,
    serviceEdit,
    appointmentTypeEdit,
    configFormEdit,
    setCustomerEditAction,
    setExpenseEditAction,
    setInventoryEditAction,
    setUserEditAction,
    setServiceEditAction,
    setAppointmentTypeEditAction,
    setConfigFormEditAction,
  };
}

export default useForms;
