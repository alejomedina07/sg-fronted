import { useState, SyntheticEvent } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { t } from 'i18next';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { SgTabPanel } from '../../../../components/utils/tabs/SgTabPanel';
import { SgButton } from '../../../../components/form/button/SgButton';
import { ReportMainComponent } from '../components/ReportMainComponent';
import { ReportDashboardComponent } from '../components/ReportDashboardComponent';
import { ReportTurnComponent } from '../components/ReportTurnComponent';

export const ReportMain = () => {
  const [value, setValue] = useState(0);
  const [graphs, setGraphs] = useState([0]);
  const [graphsTurn, setGraphsTurn] = useState([0]);

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
            label={t('turn_report')}
          />
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
        <SgButton
          label={t('compare')}
          onClickAction={() =>
            setGraphsTurn([...graphsTurn, graphsTurn.length + 1])
          }
        />
        <span id={'report-main'}>
          {graphsTurn.length > 0 &&
            graphsTurn.map((item, index) => (
              <ReportTurnComponent
                key={index}
                idDiv={`graph-combined-turn-number-${index}`}
              />
            ))}
        </span>
      </SgTabPanel>
      <SgTabPanel value={value} index={1}>
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
      <SgTabPanel value={value} index={2}>
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
