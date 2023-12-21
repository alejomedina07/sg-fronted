import { addMinutes, parseISO } from 'date-fns';
import DateFnsManager from '../../../../services/utils/DateFnsManager';

const managerDate = new DateFnsManager();

export default function AppointmentModel(
  data: AppointmentDto
): AppointmentEvent {
  return {
    appointment: AppointmentDtoModel(data),
    start: managerDate.transformStringToDate(`${data.date}`),
    end: addMinutes(parseISO(`${data.date}`), data.duration),
  };
}

function AppointmentDtoModel(data: AppointmentDto) {
  return {
    createdById: data.createdById,
    appointmentTypeId: data.appointmentTypeId,
    assignedToId: data.assignedToId,
    customerId: data.customerId,
    description: data.description,
    name: data.name,
    duration: data.duration,
    date: data.date,
    createdAt: data.createdAt,
    id: data.id,
    appointmentType: data.appointmentType,
    customer: data.customer,
    service: data.service,
  };
}
