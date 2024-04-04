import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, EventProps, View } from 'react-big-calendar';
import { getMessagesCalendar, localizer } from '../../../../helpers';
import { CalendarEvent } from '../components/CalendarEvent';
import React, { useEffect, useState } from 'react';
import {
  useGetAppointmentsQuery,
  useGetUserToListQuery,
} from '../redux/api/appointmentApi';
import { Autocomplete, Fab, LinearProgress, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useAppointment from '../redux/hooks/useAppointment';
import DateFnsManager, {
  RangeAppointmentProps,
} from '../../../../services/utils/DateFnsManager';
import UseAuth from '../../../public/auth/redux/hooks/useAuth';
import { AppointmentEvent } from '../dto/appointmentDto';
import { useTranslation } from 'react-i18next';

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
  const { userConnected } = UseAuth();
  const { data: users } = useGetUserToListQuery('');
  const [range, setRange] = useState<RangeAppointmentProps>({
    ...managerDate.currentMonth,
    idUser: userConnected?.id,
  });
  const { t } = useTranslation();
  const [userSelected, setUserSelected] = useState<any>();

  useEffect(() => {
    setRange({
      ...range,
      idUser: userSelected?.id || userConnected.id,
    });
  }, [userSelected]);

  const {
    selectAppointmentAction,
    closeModalAppointmentAction,
    openModalAppointmentAction,
  } = useAppointment();

  const { refetch, data, isLoading } = useGetAppointmentsQuery(range, {
    skip: !range,
  });

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
    selectAppointmentAction({
      appointment: event.appointment,
      refresh: refetch,
    });
    // selectAppointmentAction(event.appointment);
  };

  const onRangeChange = (props: onRangeChange) => {
    const { range: newRange } = props;
    if (Array.isArray(newRange) && newRange.length > 1) {
      const end: Date = managerDate.addDays(newRange[newRange.length - 1], 1);
      setRange({
        start: managerDate.dateToString(newRange[0]),
        end: managerDate.getEndDayToString(end),
        idUser: userSelected?.id || userConnected.id,
      });
    } else if (
      typeof newRange === 'object' &&
      newRange !== null &&
      'start' in newRange &&
      'end' in newRange
    ) {
      // range is an object with start and end properties
      const { start, end } = newRange;
      setRange({
        start: managerDate.getStartDayToString(start),
        end: managerDate.getEndDayToString(
          new Date(managerDate.addDaysString(end, 1))
        ),
        idUser: userSelected?.id || userConnected.id,
      });
    }
  };

  return (
    <div className="!h-full">
      <div className="mb-4 flex flex-row items-center">
        <span className="mr-2">{t('select_schedule_for')}</span>
        <Autocomplete
          id="combo-box-demo"
          className="flex-1"
          options={users?.data || []}
          value={userSelected || null}
          getOptionLabel={(option: any) => option.name}
          onChange={(event, newValue) => {
            setUserSelected(newValue);
          }}
          renderInput={(params) => <TextField {...params} label={t('user')} />}
          // isOptionEqualToValue={(option, value) => option.id === value}
        />
        {/* <Autocomplete */}
        {/*   className="flex-1" */}
        {/*   id="fixed-tags-demo" */}
        {/*   value={userSelected} */}
        {/*   onChange={(event, newValue) => { */}
        {/*     setUserSelected(newValue.id); */}
        {/*   }} */}
        {/*   options={users?.data || []} */}
        {/*   getOptionLabel={(option: any) => option.name} */}
        {/*   renderTags={(tagValue, getTagProps) => */}
        {/*     tagValue.map((option: any, index) => ( */}
        {/*       <Chip label={option.name} {...getTagProps({ index })} /> */}
        {/*     )) */}
        {/*   } */}
        {/*   renderInput={(params) => ( */}
        {/*     <TextField */}
        {/*       {...params} */}
        {/*       label={t('select_survey')} */}
        {/*       placeholder={t('select_survey') || ''} */}
        {/*     /> */}
        {/*   )} */}
        {/* /> */}
      </div>
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
