import { AxisValues } from '../../components/chart/SgAmchart';
import { t } from 'i18next';

export const axisReportProducts: AxisValues = {
  leftAxis: `${t('quantity')}`,
};

export const seriesReportProducts = [
  {
    type: 'Column',
    valueY: 'increment',
    dateX: 'product',
    yAxisRight: false,
    name: `${t('increment')}`,
    tooltipText: '{name}\n[bold font-size: 20]{valueY}[/]',
    fill: '#0075bf',
    // fill: '#2e302a',
    strokeWidth: 0,
    clustered: false,
    width: 10,
  },
  {
    type: 'Column',
    valueY: 'decrement',
    dateX: 'product',
    yAxisRight: false,
    name: `${t('decrement')}`,
    tooltipText: '{name}\n[bold font-size: 20]{valueY}[/]',
    fill: '#fc6d21',
    strokeWidth: 0,
    clustered: false,
    toBack: true,
    width: 25,
  },

  // {
  //   type: 'Line',
  //   valueY: 'decrement',
  //   dateX: 'product',
  //   yAxisRight: false,
  //   name: `${t('decrement')}`,
  //   tooltipText: '{name}\n[bold font-size: 20]$ {valueY}[/]',
  //   strokeWidth: 3,
  //   fill: '#ea0808',
  //   tensionX: 0.9,
  //   bullet: {
  //     radius: 3,
  //     strokeWidth: 2,
  //     fill: '#fff',
  //   },
  // },
  //
  // {
  //   type: 'Line',
  //   valueY: 'increment',
  //   dateX: 'product',
  //   yAxisRight: false,
  //   name: `${t('increment')}`,
  //   tooltipText: '{name}\n[bold font-size: 20]$ {valueY}[/]',
  //   strokeWidth: 3,
  //   fill: '#31ea08',
  //   tensionX: 0.9,
  //   bullet: {
  //     radius: 3,
  //     strokeWidth: 2,
  //     fill: '#fff',
  //   },
  // },
];
