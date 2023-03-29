import { addMinutes, parseISO } from 'date-fns';
import DateFnsManager           from '../../../../services/utils/DateFnsManager';

const managerDate = new DateFnsManager();

export default function AppointmentModel( data: AppointmentDto ): AppointmentEvent {
  console.log(777, data.date);
  console.log(9, managerDate.transformStringToDate( `${data.date}` ));
  return {
    appointment: AppointmentDtoModel(data),
    // start: parseISO( `${data.date}` ),
    start: managerDate.transformStringToDate( `${data.date}` ),
    end: addMinutes( parseISO(`${data.date}`), data.duration )
  }
}


function AppointmentDtoModel( data: AppointmentDto ) {
  return {
    createdById: data.createdById,
    appointmentTypeId: data.appointmentTypeId,
    customerId: data.customerId,
    description: data.description,
    name: data.name,
    duration: data.duration,
    date: data.date,
    createdAt: data.createdAt,
    id: data.id,
    appointmentType: data.appointmentType,
    customer: data.customer,
  }
}