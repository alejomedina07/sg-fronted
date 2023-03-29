import { parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

class DateFnsManager {

  private timezone: string = 'America/Bogota'

  transformStringToDate(dateString: string): Date {
    const date = parseISO(dateString);
    return utcToZonedTime(date, this.timezone)
  }


}

export default DateFnsManager