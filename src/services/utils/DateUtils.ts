import moment from 'moment';

// moment.locale('es', {
//   months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
//   monthsShort: 'Ene._Feb._Mar_Abr._May_Jun_Jul._Ago_Sep._Oct._Nov._Dic.'.split('_'),
//   weekdays: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
//   weekdaysShort: 'Dom._Lun._Mar._Mie._Jue._Vie._Sab.'.split('_'),
//   weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
// });


/**
 * Clase para manipular fechas
 */
class DateUtils {

  static get FORMATS_DATE() {
    return {
      YYYY_MM_DD: 'YYYY-MM-DD',
      MM_DD_YYYY: 'MMM DD, YYYY'
    };
  }

  static get FORMATS_DATE_TIME() {
    return {
      YYYY_MM_DD_HH_mm_ss_a: `${DateUtils.FORMATS_DATE.YYYY_MM_DD} HH:mm:ss a`,
    };
  }

  /**
   * Aplica un formato a una fecha
   *
   * @param {string | Date} date fecha a formatear
   * @param {string} format Formato para aplicar a la fecha. Se deben de usar los definidos en esta clase FORMATS_DATE o FORMATS_DATE_TIME
   * @returns {string} Fecha con formato
   */
  static formatDate(date: any, format: string) {
    if (!date) {
      return '';
    }

    return moment(date).format(format);
  }

  /**
   * Calcula la diferencia de fechas
   *
   * @param {string} dateI fecha a formatear
   * @param {string} format Formato para aplicar a la fecha. Se deben de usar los definidos en esta clase FORMATS_DATE o FORMATS_DATE_TIME
   * @returns {string} Fecha con formato
   */
  // static dateDiff(dateI: any, dateF = null) {
  //   const BASE_YEARS_DAYS = 365
  //   const BASE_MONTH_DAYS = 30
  //
  //   const fromDate: Date = new Date(dateI)
  //   const toDate: Date = dateF ? new Date(dateF) : new Date()
  //
  //   const diffTime = Math.abs(toDate - fromDate);
  //   const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //
  //   const diffYears = Math.floor(totalDays / BASE_YEARS_DAYS)
  //   const diffMonths = Math.floor( (totalDays - (diffYears * BASE_YEARS_DAYS)) / BASE_MONTH_DAYS )
  //   const diffDays = Math.floor(totalDays - (diffYears * BASE_YEARS_DAYS) - (diffMonths * BASE_MONTH_DAYS))
  //
  //   return {
  //     years: diffYears,
  //     months: diffMonths,
  //     days: diffDays
  //   }
  // }
}

export default DateUtils;
