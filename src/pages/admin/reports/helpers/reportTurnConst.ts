import { AxisValues } from '../../components/chart/SgAmchart';
import { t } from 'i18next';

export const axisReportTurn: AxisValues = {
  leftAxis: `${t('quantity')}`,
  rightAxis: `${t('minutes')}`,
};

export const seriesReportTurn = [
  {
    type: 'Column',
    valueY: 'total_minutes',
    dateX: 'name',
    yAxisRight: false,
    name: `${t('minutes')}`,
    tooltipText: '{name}\n[bold font-size: 20]Minutos {valueY}[/]',
    // fill: '#2e302a',
    fill: '#fc6d21',
    strokeWidth: 0,
    clustered: false,
    width: 10,
  },
  // {
  //   type: 'Column',
  //   valueY: 'serviceCount',
  //   dateX: 'date',
  //   yAxisRight: false,
  //   name: `${t('service_count')}`,
  //   tooltipText: '{name}\n[bold font-size: 20]{valueY}[/]',
  //   fill: '#fc6d21',
  //   strokeWidth: 0,
  //   clustered: false,
  //   toBack: true,
  //   width: 25,
  // },

  {
    type: 'Line',
    valueY: 'average',
    dateX: 'name',
    yAxisRight: true,
    name: `${t('average')}`,
    tooltipText: '{name}\n[bold font-size: 20]Promedio: {valueY}[/]',
    strokeWidth: 3,
    fill: '#31ea08',
    tensionX: 0.9,
    bullet: {
      radius: 3,
      strokeWidth: 2,
      fill: '#fff',
    },
  },

  {
    type: 'Line',
    valueY: 'count',
    dateX: 'name',
    yAxisRight: true,
    name: `${t('quantity')}`,
    tooltipText: '{name}\n[bold font-size: 20]Cantidad: {valueY}[/]',
    strokeWidth: 3,
    fill: '#b705a2',
    tensionX: 0.9,
    bullet: {
      radius: 3,
      strokeWidth: 2,
      fill: '#fff',
    },
  },

  // {
  //   type: 'Line',
  //   valueY: 'market2',
  //   dateX: 'date',
  //   yAxisRight: true,
  //   fill: '#b908ea',
  //   name: 'Market Days ALL',
  //   tooltipText: '{name}\n[bold font-size: 20]{valueY}[/]',
  //   strokeWidth: 2,
  //   tensionX: 0.7,
  //   strokeDasharray: '3,3',
  //   bullet: {
  //     radius: 3,
  //     strokeWidth: 2,
  //     fill: '#fff',
  //   },
  // },
];
