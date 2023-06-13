import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, EventProps, View } from 'react-big-calendar';
import { getMessagesCalendar, localizer } from '../../../../helpers';
import { CalendarEvent } from '../components/CalendarEvent';
import { useState } from 'react';
import { useGetAppointmentsQuery } from '../redux/api/appointmentApi';
import { Fab, LinearProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { t } from 'i18next';
import useAppointment from '../redux/hooks/useAppointment';
import DateFnsManager, {
  RangeAppointmentProps,
} from '../../../../services/utils/DateFnsManager';

const managerDate = new DateFnsManager();

export const MyCalendarEvent = (props: EventProps<AppointmentEvent>) => {
  const { event } = props;
  return (
    <CalendarEvent
      appointment={event.appointment}
      start={event.start}
      end={event.end}
      {...props}
    />
  );
};

interface onRangeChange {
  range: Date[] | { start: Date; end: Date };
  view?: View;
}

export const AppointmentView = () => {
  const [range, setRange] = useState<RangeAppointmentProps>(
    managerDate.currentMonth
  );

  const {
    appointment,
    selectAppointmentAction,
    closeModalAppointmentAction,
    openModalAppointmentAction,
  } = useAppointment();

  const { refetch, data, isLoading } = useGetAppointmentsQuery(range, {
    skip: !range,
  });

  const [open, setOpen] = useState<boolean>(false);

  const [lastView, setLastView] = useState<
    'month' | 'week' | 'work_week' | 'day' | 'agenda'
  >(() => {
    const storedValue = localStorage.getItem('lastView');
    if (
      storedValue &&
      (storedValue === 'month' ||
        storedValue === 'week' ||
        storedValue === 'work_week' ||
        storedValue === 'day' ||
        storedValue === 'agenda')
    ) {
      return storedValue;
    }
    return 'month';
  });

  const onViewChange = (
    event: 'month' | 'week' | 'work_week' | 'day' | 'agenda'
  ) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  };

  const handleClose = () => {
    closeModalAppointmentAction();
  };

  const onSelect = (event: any) => {
    console.log('event.appointment::;', event.appointment);
    selectAppointmentAction({
      appointment: event.appointment,
      refresh: refetch,
    });
    // selectAppointmentAction(event.appointment);
  };

  const onRangeChange = (props: onRangeChange) => {
    const { range: newRange, view } = props;
    console.log('onRangeChange:::', newRange);
    if (Array.isArray(newRange) && newRange.length > 1) {
      const end: Date = managerDate.addDays(newRange[newRange.length - 1], 1);
      setRange({
        start: managerDate.dateToString(newRange[0]),
        end: managerDate.getEndDayToString(end),
      });
      console.log('array', range);
    } else if (
      typeof newRange === 'object' &&
      newRange !== null &&
      'start' in newRange &&
      'end' in newRange
    ) {
      // range is an object with start and end properties
      const { start, end } = newRange;
      setRange({
        start: managerDate.dateToString(start),
        end: managerDate.addDaysString(end, 1),
      });
      console.log('objec', range);
    }
  };

  return (
    <div className="!h-full">
      {!!isLoading && <LinearProgress />}
      <Calendar
        culture="es"
        localizer={localizer}
        events={data}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 180px) ' }}
        messages={getMessagesCalendar()}
        components={{ event: MyCalendarEvent }}
        onView={onViewChange}
        onRangeChange={(range, view) => onRangeChange({ range, view })}
        onSelectEvent={onSelect}
      />
      <Fab
        className="!absolute bottom-5 right-8"
        aria-label={`${t('add')}`}
        color="primary"
        onClick={() =>
          openModalAppointmentAction({ refresh: refetch, onClose: handleClose })
        }
      >
        <AddIcon />
      </Fab>
    </div>
  );
};
