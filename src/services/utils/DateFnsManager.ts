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

  // addHoursAndMinutes(date: Date, hours: number, minutes: number): string {
  //   const endDay = endOfDay(date);
  //   return formatISO(setHours(date, hours));
  // }

  getEndDayToString(date: Date): string {
    return formatISO(endOfDay(date));
  }

  getStartDayToString(date: Date): string {
    return formatISO(startOfDay(date));
  }

  getFormatStandard(date: Date | number, hours: boolean = false): string {
    const formatDate = hours ? 'yyyy-MM hh:mm a' : 'yyyy-MM-dd';
    return format(date, formatDate);
  }

  getFormatMonthText(date: Date | number): string {
    return format(date, 'yyyy MMMM dd', { locale: es });
  }

  getFormatStandardMonth(date: Date | number): string {
    return format(date, 'yyyy-MM');
  }

  getDateDifference(
    startDate: Date,
    endDate: Date,
    unit: 'days' | 'months' | 'years' = 'days'
  ): number {
    let difference = endDate.getTime() - startDate.getTime();
    let sign = 1;
    if (endDate < startDate) {
      sign = -1;
      difference *= -1;
    }
    switch (unit) {
      case 'days':
        return Math.ceil(difference / (1000 * 60 * 60 * 24)) * sign;
      case 'months':
        const startMonth = startDate.getMonth();
        const startYear = startDate.getFullYear();
        const endMonth = endDate.getMonth();
        const endYear = endDate.getFullYear();
        let monthsDifference =
          endMonth - startMonth + 12 * (endYear - startYear);
        return monthsDifference * sign;
      case 'years':
        let yearsDifference = endDate.getFullYear() - startDate.getFullYear();
        return yearsDifference * sign;
      default:
        throw new Error('Invalid unit specified');
    }
    // const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    // switch (unit) {
    //   case 'days':
    //     return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //   case 'months':
    //     const startMonth = startDate.getMonth();
    //     const startYear = startDate.getFullYear();
    //     const endMonth = endDate.getMonth();
    //     const endYear = endDate.getFullYear();
    //     return endMonth - startMonth + 12 * (endYear - startYear);
    //   case 'years':
    //     return endDate.getFullYear() - startDate.getFullYear();
    //   default:
    //     throw new Error('Invalid unit specified');
    // }
  }
}

export interface RangeAppointmentProps {
  start: Date | string;
  end: Date | string;
  idUser?: number;
}

export default DateFnsManager;
