import { AppointmentDto } from './dto/appointmentDto';

export const defaultValuesFormAppointment: AppointmentDto = {
  name: '',
  addService: false,
  duration: 30,
  date: new Date(),
};
