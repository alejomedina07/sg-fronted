import { useGetServiceReportQuery } from '../../appointment/redux/api/appointmentApi';

import { useState, useEffect, useRef, SyntheticEvent } from 'react';
import { SgAmchartCombined } from '../../components/chart/SgAmchartCombined';
import { Box, Tab, Tabs } from '@mui/material';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { t } from 'i18next';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { SgTabPanel } from '../../../../components/utils/tabs/SgTabPanel';
import { SgButton } from '../../../../components/form/button/SgButton';
import {
  AxisValues,
  CombinedData,
  InputData,
} from '../../components/chart/SgAmchart';
import { SgAmchartDonut } from '../../components/chart/SgAmchartDonut';

const dataDount = [
  {
    name: 'Urgencia',
    amount: '$250,000.00',
  },
  {
    name: 'Cirugía',
    amount: '$160,000.00',
  },
  {
    name: 'Consulta',
    amount: '$460,000.00',
  },
];

const data = [
  {
    date: '2023-01-16',
    market1: 71,
    market2: 75,
    sales1: 5,
    sales2: 8,
  },
  {
    date: '2023-01-17',
    market1: 74,
    market2: 78,
    sales1: 4,
    sales2: 6,
  },
  {
    date: '2023-01-18',
    market1: 78,
    market2: 88,
    sales1: 5,
    sales2: 2,
  },
  {
    date: '2023-01-19',
    market1: 85,
    market2: 89,
    sales1: 8,
    sales2: 9,
  },
  {
    date: '2023-01-20',
    market1: 82,
    market2: 89,
    sales1: 9,
    sales2: 6,
  },
  {
    date: '2023-01-21',
    market1: 83,
    market2: 85,
    sales1: 3,
    sales2: 5,
  },
  {
    date: '2023-01-22',
    market1: 88,
    market2: 92,
    sales1: 5,
    sales2: 7,
  },
  {
    date: '2023-01-23',
    market1: 85,
    market2: 90,
    sales1: 7,
    sales2: 6,
  },
  {
    date: '2023-01-24',
    market1: 85,
    market2: 91,
    sales1: 9,
    sales2: 5,
  },
  {
    date: '2023-01-25',
    market1: 80,
    market2: 84,
    sales1: 5,
    sales2: 8,
  },
  {
    date: '2023-01-26',
    market1: 87,
    market2: 92,
    sales1: 4,
    sales2: 8,
  },
  // {
  //   date: '2023-01-27',
  //   market1: 84,
  //   market2: 87,
  //   sales1: 3,
  //   sales2: 4,
  // },
  // {
  //   date: '2023-01-28',
  //   market1: 83,
  //   market2: 88,
  //   sales1: 5,
  //   sales2: 7,
  // },
  // {
  //   date: '2023-01-29',
  //   market1: 84,
  //   market2: 87,
  //   sales1: 5,
  //   sales2: 8,
  // },
  // {
  //   date: '2023-01-30',
  //   market1: 81,
  //   market2: 85,
  //   sales1: 4,
  //   sales2: 7,
  // },
];

const axis: AxisValues = {
  leftAxis: 'Sales left',
  rightAxis: 'Amount',
};

const series = [
  {
    type: 'Column',
    valueY: 'sales1',
    dateX: 'date',
    yAxisRight: false,
    name: 'Target Sales',
    tooltipText: '{name}\n[bold font-size: 20]${valueY}M[/]',
    fill: '#0091bb',
    strokeWidth: 0,
    clustered: false,
    width: 40,
  },
  {
    type: 'Column',
    valueY: 'sales2',
    dateX: 'date',
    yAxisRight: false,
    name: 'Actual Sales',
    tooltipText: '{name}\n[bold font-size: 20]${valueY}M[/]',
    fill: '#34efef',
    strokeWidth: 0,
    clustered: false,
    toBack: true,
  },

  {
    type: 'Line',
    valueY: 'market1',
    dateX: 'date',
    yAxisRight: true,
    name: 'Market Days',
    tooltipText: '{name}\n[bold font-size: 20]{valueY}[/]',
    strokeWidth: 2,
    fill: '#ea0808',
    tensionX: 0.7,
    bullet: {
      radius: 3,
      strokeWidth: 2,
      fill: '#fff',
    },
  },
  {
    type: 'Line',
    valueY: 'market2',
    dateX: 'date',
    yAxisRight: true,
    fill: '#b908ea',
    name: 'Market Days ALL',
    tooltipText: '{name}\n[bold font-size: 20]{valueY}[/]',
    strokeWidth: 2,
    tensionX: 0.7,
    strokeDasharray: '3,3',
    bullet: {
      radius: 3,
      strokeWidth: 2,
      fill: '#fff',
    },
  },
];

export const ReportMain = () => {
  const { data: report, refetch } = useGetServiceReportQuery('');
  const [value, setValue] = useState(0);
  const [dataReportMain, setDataReportMain] = useState();

  useEffect(() => {
    if (report?.data) {
      // const { dataExpense, dataService } = report?.data;
      const dataResult = combineData(report.data);
      console.log(':::', dataResult);
    }
  }, [report]);

  function combineData(inputData: InputData): CombinedData[] {
    const nameSet = new Set<string>();
    inputData.dataService.forEach((service) => nameSet.add(service.name));
    inputData.dataExpense.forEach((expense) => nameSet.add(expense.name));

    const combinedData: CombinedData[] = [];

    nameSet.forEach((name) => {
      const service = inputData.dataService.find((s) => s.name === name);
      const expense = inputData.dataExpense.find((e) => e.name === name);

      const combinedItem: CombinedData = {
        name,
        serviceCount: service ? service.count : '0',
        serviceTotalAmount: service ? service.totalAmount : 0,
        expenseCount: expense ? expense.count : '0',
        expenseTotalAmount: expense ? expense.totalAmount : 0,
      };

      combinedData.push(combinedItem);
    });

    return combinedData;
  }

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const refresh = () => {
    refetch();
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon position tabs example"
        >
          <Tab
            icon={<PermContactCalendarIcon />}
            iconPosition="start"
            label={t('main_report')}
          />
          <Tab
            icon={<MonetizationOnIcon />}
            iconPosition="start"
            label={t('report_service')}
          />
          <Tab
            icon={<CalendarMonthIcon />}
            iconPosition="start"
            label={t('report_expense')}
          />
        </Tabs>
      </Box>
      <SgTabPanel value={value} index={0}>
        <div className="flex flex-row items-center">
          <SgButton label={t('refresh')} onClickAction={refresh} />
        </div>
        <SgAmchartCombined data={data} axis={axis} series={series} />
      </SgTabPanel>
      <SgTabPanel value={value} index={1}>
        <SgAmchartDonut
          data={dataDount}
          valueName="amount"
          categoryName="name"
        />
      </SgTabPanel>
      <SgTabPanel value={value} index={2}>
        Item Three
      </SgTabPanel>
    </>
  );
};
