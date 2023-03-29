import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, EventProps }                                           from 'react-big-calendar';
import { getMessagesCalendar, localizer }                                 from '../../../../helpers';
import { CalendarEvent }                                                  from '../componets/CalendarEvent';
import { useState }                                                       from 'react';
import { useGetAppointmentsQuery }                                      from '../redux/api/appointmentApi';
import { Button, Dialog, DialogActions, DialogContent, Fab, TextField } from '@mui/material';
import AddIcon                                                          from '@mui/icons-material/Add';
import { SgDialogTitle }                                                  from '../../../../components/utils/dialogs/SgDialogTitle';
import { SgTransition }                                                                         from '../../../../components/utils/dialogs/SgTransition';

// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import dayjs, { Dayjs } from 'dayjs';

export const MyCalendarEvent = (props: EventProps<AppointmentEvent>) => {
  const { event } = props;
  return <CalendarEvent appointment={event.appointment} start={event.start} end={event.end} {...props} />;
};

export interface DialogFormAppointmentProps {
  open: boolean;
  onClose: () => void;
}

function DialogFormAppointment(props: DialogFormAppointmentProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };
  // const [value, setValue] = useState<Dayjs | null>(
  //   dayjs('2014-08-18T21:11:54'),
  // );
  //
  // const handleChange = (newValue: Dayjs | null) => {
  //   setValue(newValue);
  // };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'md'} TransitionComponent={SgTransition}>
      <SgDialogTitle id={'appointment-dialog'} onClose={onClose}> Agregar appointment</SgDialogTitle>
      <DialogContent dividers>
        {/* <DateTimePicker */}
        {/*   label="Date&Time picker" */}
        {/*   value={value} */}
        {/*   onChange={handleChange} */}
        {/*   // renderInput={(params) => <TextField {...params} />} */}
        {/* /> */}
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab deleniti dignissimos ducimus expedita facere facilis, fuga illo ipsam itaque laboriosam laborum nesciunt officia officiis quae similique unde vero! Consectetur!
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}


export const AppointmentView = () => {
  const { data, isLoading } = useGetAppointmentsQuery('')

  const [open, setOpen] = useState<boolean>(false);
  console.log(123, data);

  const [lastView, setLastView] = useState<"month" | "week" | "work_week" | "day" | "agenda">(
    () => {
      const storedValue = localStorage.getItem('lastView');
      if (storedValue && (storedValue === 'month' || storedValue === 'week' || storedValue === 'work_week' || storedValue === 'day' || storedValue === 'agenda')) {
        return storedValue;
      }
      return 'month';
    }
  );

  const onViewChange = (event: "month" | "week" | "work_week" | "day" | "agenda") => {
    console.log(event);
    localStorage.setItem('lastView', event);
    setLastView(event);
  }

  const handleClose = () => {
    console.log('cierre de modal');
    setOpen(false);
  };

  return (
    <div className="!h-full">
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
      />
      <Fab className="!absolute bottom-5 right-8" aria-label={'Agregar'} color="primary" onClick={()=> setOpen(!open)}>
        <AddIcon />
      </Fab>
      <DialogFormAppointment open={open} onClose={handleClose}/>
    </div>
  );
};
