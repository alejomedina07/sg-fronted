import { createSlice } from '@reduxjs/toolkit';

export interface appointmentSliceProps {
  start?: string;
  end?: string;
  isOpenModalAppointment: boolean;
  appointment?: AppointmentDto | null;
  refresh?: () => void;
  onClose?: () => void;
}

export interface openModalAppointmentProps {
  refresh?: () => void;
  onClose?: () => void;
}

const initialState: appointmentSliceProps = { isOpenModalAppointment: false };

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    changeRange: (state, action) => {
      state.start = action.payload.start;
      state.end = action.payload.end;
    },
    selectAppointment: (state, action) => {
      state.appointment = action.payload.appointment;
      state.refresh = action.payload.refresh;
      state.isOpenModalAppointment = true;
    },
    closeModalAppointment: (state) => {
      state.appointment = null;
      state.isOpenModalAppointment = false;
    },
    openModalAppointment: (state, action) => {
      state.appointment = null;
      state.isOpenModalAppointment = true;
      state.refresh = action.payload.refresh;
      state.onClose = action.payload.onClose;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeRange,
  closeModalAppointment,
  selectAppointment,
  openModalAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
