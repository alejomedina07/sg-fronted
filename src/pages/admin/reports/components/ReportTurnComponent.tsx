import { FilterDates } from '../../components/share/filters/FilterDates';
import { SgAmchartCombined } from '../../components/chart/SgAmchartCombined';
import { axisReportMain, seriesReportMain } from '../helpers/reportMainConst';
import { useEffect, useState } from 'react';
import { CombinedData, InputData } from '../../components/chart/SgAmchart';
import { Skeleton } from '@mui/material';
import { useGetReportTurnsQuery } from '../redux/api/reportApi';
import { axisReportTurn, seriesReportTurn } from '../helpers/reportTurnConst';
import { SgAmchartDonut } from '../../components/chart/SgAmchartDonut';

interface ReportMainComponentProps {
  idDiv: string;
}

export const ReportTurnComponent = (props: ReportMainComponentProps) => {
  const { idDiv } = props;
  const refresh = (dataFilters: any) => {
    if (dataFilters === filters) refetch();
    setFilters(dataFilters);
  };

  const [filters, setFilters] = useState('?type=current_month');
  const { data: report, refetch, isLoading } = useGetReportTurnsQuery(filters);

  console.log(777, report);

  return (
    <>
      {/* <div className="flex flex-row items-center"> */}
      {/*   <SgButton label={t('refresh')} onClickAction={refresh} /> */}
      {/* </div> */}
      {/* <SgButton label={t('print')} onClickAction={printChart} /> */}
      <FilterDates onChange={refresh} />
      {!!isLoading && <Skeleton variant="rectangular" height={218} />}
      {!isLoading && (
        <span className="flex flex-col">
          <b className="text-2xl"> Reporte de Turnos </b>
          <SgAmchartDonut
            idDiv="serviceDashboard"
            data={report?.data?.turns || []}
            valueName="count"
            categoryName="name"
          />
          <b className="text-2xl"> Reporte de Atenciones </b>
          <SgAmchartCombined
            idDiv={idDiv}
            data={report?.data?.attentions || []}
            axis={axisReportTurn}
            series={seriesReportTurn}
            category="name"
          />
        </span>
      )}
    </>
  );
};
