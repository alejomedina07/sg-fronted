import { createSlice } from '@reduxjs/toolkit';


const SLICE_NAME = 'forms';

interface initialStateFormProps {
  userEdit: null | User
}

// Slice
const initialState: initialStateFormProps  = {
  userEdit: null
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
          delete user.rol
        }
        if (Object.getOwnPropertyDescriptor(user, 'status')?.configurable) {
          delete user.status
        }
        if (Object.getOwnPropertyDescriptor(user, 'documentType')?.configurable) {
          delete user.documentType
        }
        if (Object.getOwnPropertyDescriptor(user, 'password')?.configurable) {
          delete user.password
        }
        state.userEdit = user
      }
    },
  },
});

export const { setUserEdit } = formSlice.actions;

export default formSlice.reducer;
