import { addDays, endOfMonth, formatISO, parseISO, startOfMonth } from 'date-fns';
import { utcToZonedTime }                                         from 'date-fns-tz';

class DateFnsManager {

  private timezone: string = 'America/Bogota';
  private currentDate = new Date();
  currentMonth : RangeAppointmentProps = {
    start: formatISO(startOfMonth(this.currentDate)), end: formatISO(endOfMonth(this.currentDate))
  }

  transformStringToDate(dateString: string): Date {
    const date = parseISO(dateString);
    return utcToZonedTime(date, this.timezone)
  }

  dateToString(date: Date): string {
    return formatISO(date)
  }

  addDaysString(date:Date, days: number): string {
    return formatISO( addDays(date, days) )
  }

}


export interface RangeAppointmentProps {
  start: Date | string;
  end: Date | string;
}


export default DateFnsManager