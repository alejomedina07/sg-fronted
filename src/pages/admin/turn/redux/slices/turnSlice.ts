import { createSlice } from '@reduxjs/toolkit';
import { Person } from '../../dto/Person';

export interface turnSliceProps {
  turnInAttention?: Person | null;
  configuration?: any;
}

const initialState: turnSliceProps = {};

export const turnSlice = createSlice({
  name: 'turn',
  initialState,
  reducers: {
    takenTurn: (state, action) => {
      state.turnInAttention = action.payload.turnInAttention;
    },
    deleteConfig: (state) => {
      state.configuration = null;
    },
    setConfig: (state, action) => {
      state.configuration = action.payload;
    },
    finishTurn: (state) => {
      state.turnInAttention = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { deleteConfig, setConfig, takenTurn, finishTurn } =
  turnSlice.actions;

export default turnSlice.reducer;
