import { createSlice } from '@reduxjs/toolkit'

export interface appointmentSliceProps {
  start?: string;
  end?: string;
  appointment?: AppointmentDto
}

const initialState: appointmentSliceProps = {};


export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    changeRange: (state, action) => {
      state.start = action.payload.start
      state.end = action.payload.end
    },
    selectAppointment: (state, action) => {
      console.log(78, action.payload);
      state.appointment = action.payload
    },
    closeModalAppointment: (state) => {
      state.appointment = undefined;
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeRange, closeModalAppointment, selectAppointment } = appointmentSlice.actions;


export default appointmentSlice.reducer;
