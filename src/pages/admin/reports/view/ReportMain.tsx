import { useState, useEffect, SyntheticEvent } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { t } from 'i18next';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { SgTabPanel } from '../../../../components/utils/tabs/SgTabPanel';
import { SgButton } from '../../../../components/form/button/SgButton';
import { SgAmchartDonut } from '../../components/chart/SgAmchartDonut';
import { ReportMainComponent } from '../components/ReportMainComponent';
import { ReportDashboardComponent } from '../components/ReportDashboardComponent';

export const ReportMain = () => {
  const [value, setValue] = useState(0);
  const [graphs, setGraphs] = useState([0]);

  console.log(graphs);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // const printChart = () => {
  //   const chartContainer = document.getElementById('report-main');
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
            label={t('report_resume')}
          />
        </Tabs>
      </Box>
      <SgTabPanel value={value} index={0}>
        {/* <FilterDates onChange={refresh} /> */}
        {/* /!* <div className="flex flex-row items-center"> *!/ */}
        {/* /!*   <SgButton label={t('refresh')} onClickAction={refresh} /> *!/ */}
        {/* /!* </div> *!/ */}
        {/* <SgButton label={t('print')} onClickAction={printChart} /> */}
        {/* <SgAmchartCombined */}
        {/*   data={dataReportMain} */}
        {/*   axis={axisReportMain} */}
        {/*   series={seriesReportMain} */}
        {/* /> */}
        <SgButton
          label={t('compare')}
          onClickAction={() => setGraphs([...graphs, graphs.length + 1])}
        />
        <span id={'report-main'}>
          {graphs.length > 0 &&
            graphs.map((item, index) => (
              <ReportMainComponent
                key={index}
                idDiv={`graph-combined-number-${index}`}
              />
            ))}
        </span>
      </SgTabPanel>
      <SgTabPanel value={value} index={1}>
        <ReportDashboardComponent />
        {/* <SgAmchartDonut */}
        {/*   data={dataDonut} */}
        {/*   valueName="amount" */}
        {/*   categoryName="name" */}
        {/* /> */}
      </SgTabPanel>
    </>
  );
};
