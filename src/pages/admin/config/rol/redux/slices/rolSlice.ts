import { createSlice } from '@reduxjs/toolkit';

export interface rolSliceProps {
  rol?: RolDto | null;
  refresh?: () => void;
}

const initialState: rolSliceProps = {};

export const rolSlice = createSlice({
  name: 'rol',
  initialState,
  reducers: {
    selectRol: (state, action) => {
      // console.log(78, action.payload);
      state.rol = action.payload.rol;
      state.refresh = action.payload.refresh;
    },
    clearRol: (state) => {
      // console.log(78, action.payload);
      state.rol = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectRol, clearRol } = rolSlice.actions;

export default rolSlice.reducer;
