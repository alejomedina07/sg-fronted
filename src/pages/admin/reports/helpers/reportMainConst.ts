import { AxisValues } from '../../components/chart/SgAmchart';
import { t } from 'i18next';

export const axisReportMain: AxisValues = {
  leftAxis: `${t('quantity')}`,
  rightAxis: `${t('money')}`,
};

export const seriesReportMain = [
  {
    type: 'Column',
    valueY: 'expenseCount',
    dateX: 'date',
    yAxisRight: false,
    name: `${t('expense_count')}`,
    tooltipText: '{name}\n[bold font-size: 20]{valueY}[/]',
    fill: '#2e302a',
    strokeWidth: 0,
    clustered: false,
    width: 10,
  },
  {
    type: 'Column',
    valueY: 'serviceCount',
    dateX: 'date',
    yAxisRight: false,
    name: `${t('service_count')}`,
    tooltipText: '{name}\n[bold font-size: 20]{valueY}[/]',
    fill: '#fc6d21',
    strokeWidth: 0,
    clustered: false,
    toBack: true,
    width: 25,
  },

  {
    type: 'Line',
    valueY: 'serviceTotalAmount',
    dateX: 'date',
    yAxisRight: true,
    name: `${t('service_total_amount')}`,
    tooltipText: '{name}\n[bold font-size: 20]$ {valueY}[/]',
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
    valueY: 'expenseTotalAmount',
    dateX: 'date',
    yAxisRight: true,
    name: `${t('expense_total_amount')}`,
    tooltipText: '{name}\n[bold font-size: 20]$ {valueY}[/]',
    strokeWidth: 3,
    fill: '#ea0808',
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
