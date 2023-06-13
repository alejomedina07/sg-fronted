import { useGetServiceReportQuery } from '../../appointment/redux/api/appointmentApi';
import { useState, useEffect, SyntheticEvent } from 'react';
import { SgAmchartCombined } from '../../components/chart/SgAmchartCombined';
import { Box, Tab, Tabs } from '@mui/material';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { t } from 'i18next';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { SgTabPanel } from '../../../../components/utils/tabs/SgTabPanel';
import { SgButton } from '../../../../components/form/button/SgButton';
import { CombinedData, InputData } from '../../components/chart/SgAmchart';
import { SgAmchartDonut } from '../../components/chart/SgAmchartDonut';
import { axisReportMain, seriesReportMain } from '../helpers/reportMainConst';

const dataDonut = [
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

export const ReportMain = () => {
  const { data: report, refetch } = useGetServiceReportQuery('');
  const [value, setValue] = useState(0);
  const [dataReportMain, setDataReportMain] = useState<any[]>([]);

  useEffect(() => {
    if (report?.data) {
      const dataResult = combineData(report.data);
      console.log(':::', dataResult);
      setDataReportMain(dataResult);
    }
  }, [report]);

  function combineData(inputData: InputData): CombinedData[] {
    const nameSet = new Set<string>();
    inputData.dataService.forEach((service) => nameSet.add(service.name));
    inputData.dataExpense.forEach((expense) => nameSet.add(expense.name));

    const combinedData: CombinedData[] = [];

    nameSet.forEach((date) => {
      const service = inputData.dataService.find((s) => s.name === date);
      const expense = inputData.dataExpense.find((e) => e.name === date);
      console.log(12, expense);
      const combinedItem: CombinedData = {
        date,
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

  // const printChart = () => {
  //   const chartContainer = document.getElementById('chartdiv');
  //
  //   if (chartContainer) {
  //     const printWindow = window.open('', '_blank');
  //     const chartClone = chartContainer.cloneNode(true);
  //
  //     printWindow?.document.open();
  //     printWindow?.document.write(`
  //     <html>
  //       <head>
  //         <title>Print Chart</title>
  //         <style>
  //           body { margin: 0; }
  //         </style>
  //       </head>
  //       <body>
  //         ${chartClone?.outerHTML}
  //       </body>
  //     </html>
  //   `);
  //     printWindow?.document.close();
  //     printWindow?.print();
  //   }
  // };

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
          {/* <SgButton label={t('print')} onClickAction={printChart} /> */}
        </div>
        <SgAmchartCombined
          data={dataReportMain}
          axis={axisReportMain}
          series={seriesReportMain}
        />
      </SgTabPanel>
      <SgTabPanel value={value} index={1}>
        <SgAmchartDonut
          data={dataDonut}
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
