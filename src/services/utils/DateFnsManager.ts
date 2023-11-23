import {
  addDays,
  endOfDay,
  endOfMonth,
  format,
  formatISO,
  parseISO,
  setHours,
  startOfDay,
  startOfMonth,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { es } from 'date-fns/locale';

class DateFnsManager {
  private timezone: string = 'America/Bogota';
  private currentDate = new Date();
  currentMonth: RangeAppointmentProps = {
    start: formatISO(startOfMonth(this.currentDate)),
    end: formatISO(endOfMonth(this.currentDate)),
  };

  transformStringToDate(dateString: string): Date {
    const date = parseISO(dateString);
    return utcToZonedTime(date, this.timezone);
  }

  addDays(date: Date, days: number): Date {
    return addDays(date, days);
  }

  dateToString(date: Date): string {
    return formatISO(date);
  }

  addDaysString(date: Date, days: number): string {
    return formatISO(addDays(date, days));
  }

  addHoursAndMinutes(date: Date, hours: number, minutes: number): string {
    const endDay = endOfDay(date);
    console.log('addHoursAndMinutes::', endDay);
    return formatISO(setHours(date, hours));
  }

  getEndDayToString(date: Date): string {
    return formatISO(endOfDay(date));
  }

  getStartDayToString(date: Date): string {
    return formatISO(startOfDay(date));
  }

  getFormatStandard(date: Date | number): string {
    return format(date, 'yyyy-MM-dd');
  }

  getFormatMonthText(date: Date | number): string {
    return format(date, 'yyyy MMMM dd', { locale: es });
  }

  getFormatStandardMonth(date: Date | number): string {
    return format(date, 'yyyy-MM');
  }
}

export interface RangeAppointmentProps {
  start: Date | string;
  end: Date | string;
}

export default DateFnsManager;
