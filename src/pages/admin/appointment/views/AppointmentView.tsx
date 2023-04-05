import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, EventProps }           from 'react-big-calendar';
import { getMessagesCalendar, localizer } from '../../../../helpers';
import { CalendarEvent }                  from '../components/CalendarEvent';
import { useState }                       from 'react';
import { useGetAppointmentsQuery } from '../redux/api/appointmentApi';
import { Fab, LinearProgress }     from '@mui/material';
import AddIcon                     from '@mui/icons-material/Add';
import { DialogFormAppointment }          from '../components/DialogFormAppointment';
import { t }                      from 'i18next';

export const MyCalendarEvent = (props: EventProps<AppointmentEvent>) => {
  const { event } = props;
  return <CalendarEvent appointment={event.appointment} start={event.start} end={event.end} {...props} />;
};


export const AppointmentView = () => {
  const { refetch, data, isLoading } = useGetAppointmentsQuery('')

  const [open, setOpen] = useState<boolean>(false);
  // console.log(123, data);

  const [lastView, setLastView] = useState< 'month' | 'week' | 'work_week' | 'day' | 'agenda'>(
    () => {
      const storedValue = localStorage.getItem('lastView');
      if (storedValue && (storedValue === 'month' || storedValue === 'week' || storedValue === 'work_week' || storedValue === 'day' || storedValue === 'agenda')) {
        return storedValue;
      }
      return 'month';
    }
  );

  const onViewChange = (event: 'month' | 'week' | 'work_week' | 'day' | 'agenda') => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const onSelect = (event: any) => {
    console.log(12, event);
  }

  return (
    <div className="!h-full">
      {!!isLoading && (<LinearProgress />)}
      <Calendar
        culture="es"
        localizer={localizer}
        events={data}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 180px) ' }}
        messages={ getMessagesCalendar() }
        components={ { event: MyCalendarEvent } }
        onView={onViewChange}
        onSelectEvent={onSelect}
      />
      <Fab className="!absolute bottom-5 right-8" aria-label={t('add')} color="primary" onClick={()=> setOpen(!open)}>
        <AddIcon />
      </Fab>
      <DialogFormAppointment open={open} onClose={handleClose} refetch={refetch}/>
    </div>
  );
};
