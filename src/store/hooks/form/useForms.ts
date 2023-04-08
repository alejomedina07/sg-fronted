import useGlobalStore                                                                     from '../useGlobalStore';
import {
  setAppointmentTypeEdit,
  setCustomerEdit,
  setExpenseEdit,
  setInventoryEdit,
  setServiceEdit,
  setUserEdit,
} from '../../slices/formSlice';

function useForms() {
  const { dispatch, useTypedSelector } = useGlobalStore();

  const { userEdit, customerEdit, expenseEdit, inventoryEdit, serviceEdit, appointmentTypeEdit } = useTypedSelector(({ core }: any) => core.forms);

  const setUserEditAction = (user: User) => dispatch( setUserEdit(user) )

  const setCustomerEditAction = (customer: Customer) => dispatch( setCustomerEdit(customer) )

  const setExpenseEditAction = (expense: Expense) => dispatch( setExpenseEdit(expense) )

  const setInventoryEditAction = (inventory: Inventory) => dispatch( setInventoryEdit(inventory) )

  const setServiceEditAction = (service: Service) => dispatch( setServiceEdit(service) )

  const setAppointmentTypeEditAction = (appointmentType: AppointmentType) => dispatch( setAppointmentTypeEdit(appointmentType) )

  return {
    customerEdit,
    userEdit,
    expenseEdit,
    inventoryEdit,
    serviceEdit,
    appointmentTypeEdit,
    setCustomerEditAction,
    setExpenseEditAction,
    setInventoryEditAction,
    setServiceEditAction,
    setUserEditAction,
    setAppointmentTypeEditAction,
  };
}

export default useForms;