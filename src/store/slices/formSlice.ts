import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'forms';

interface initialStateFormProps {
  userEdit: null | User;
  customerEdit: null | Customer;
  expenseEdit: null | Expense;
  inventoryEdit: null | Inventory;
  serviceEdit: null | Service;
  appointmentTypeEdit: null | AppointmentType;
  configFormEdit: null | OptionsList;
}

// Slice
const initialState: initialStateFormProps = {
  userEdit: null,
  customerEdit: null,
  expenseEdit: null,
  inventoryEdit: null,
  serviceEdit: null,
  appointmentTypeEdit: null,
  configFormEdit: null,
};

const formSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    resetListsState: () => initialState,
    setUserEdit: (state, action) => {
      let user = { ...action.payload };
      if (user) {
        if (Object.getOwnPropertyDescriptor(user, 'rol')?.configurable) {
          delete user.rol;
        }
        if (Object.getOwnPropertyDescriptor(user, 'status')?.configurable) {
          delete user.status;
        }
        if (
          Object.getOwnPropertyDescriptor(user, 'documentType')?.configurable
        ) {
          delete user.documentType;
        }
        if (Object.getOwnPropertyDescriptor(user, 'password')?.configurable) {
          delete user.password;
        }
        state.userEdit = user;
      }
    },
    setCustomerEdit: (state, action) => {
      let customer = { ...action.payload };
      if (customer) {
        if (Object.getOwnPropertyDescriptor(customer, 'status')?.configurable) {
          delete customer.status;
        }
        if (
          Object.getOwnPropertyDescriptor(customer, 'documentType')
            ?.configurable
        ) {
          delete customer.documentType;
        }
        if (
          Object.getOwnPropertyDescriptor(customer, 'password')?.configurable
        ) {
          delete customer.password;
        }
        state.customerEdit = customer;
      }
    },
    setExpenseEdit: (state, action) => {
      let expense = { ...action.payload };
      if (expense) {
        state.expenseEdit = expense;
      }
    },
    setInventoryEdit: (state, action) => {
      let inventory = { ...action.payload };
      if (inventory) {
        if (
          Object.getOwnPropertyDescriptor(inventory, 'status')?.configurable
        ) {
          delete inventory.status;
        }
        state.inventoryEdit = inventory;
      }
    },
    setServiceEdit: (state, action) => {
      let service = { ...action.payload };
      if (service) {
        if (Object.getOwnPropertyDescriptor(service, 'status')?.configurable) {
          delete service.status;
        }
        state.serviceEdit = service;
      }
    },
    setAppointmentTypeEdit: (state, action) => {
      let appointmentType = { ...action.payload };
      if (appointmentType) {
        state.appointmentTypeEdit = appointmentType;
      }
    },
    setConfigFormEdit: (state, action) => {
      let configForm = { ...action.payload };
      if (configForm) {
        state.configFormEdit = configForm;
      }
    },
  },
});

export const {
  setUserEdit,
  setCustomerEdit,
  setExpenseEdit,
  setInventoryEdit,
  setServiceEdit,
  setAppointmentTypeEdit,
  setConfigFormEdit,
} = formSlice.actions;

export default formSlice.reducer;
