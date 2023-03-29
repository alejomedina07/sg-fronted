// import { AppointmentEvent }       from '../../dto/appointment';

export const CalendarEvent  = ( props:  AppointmentEvent ) => {
  // console.log(777, props.appointment);
  const { appointment } = props;
  return (
    <>
      <b> { appointment.appointmentType?.name || appointment.name } &nbsp;</b>
      { !!appointment.customer && (
        <>
          <i>- { appointment.customer.name }</i>
        </>
      )}
      <br/>
      { appointment.appointmentType?.description || appointment.description }
    </>
  );
};
