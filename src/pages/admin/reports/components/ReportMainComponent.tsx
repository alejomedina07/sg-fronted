import { FilterDates } from '../../components/share/filters/FilterDates';
import { SgAmchartCombined } from '../../components/chart/SgAmchartCombined';
import { axisReportMain, seriesReportMain } from '../helpers/reportMainConst';
import { useEffect, useState } from 'react';
import { CombinedData, InputData } from '../../components/chart/SgAmchart';
import { Skeleton } from '@mui/material';
import { useGetReportMainQuery } from '../redux/api/reportApi';

interface ReportMainComponentProps {
  idDiv: string;
}

export const ReportMainComponent = (props: ReportMainComponentProps) => {
  const { idDiv } = props;
  const refresh = (dataFilters: any) => {
    if (dataFilters === filters) refetch();
    setFilters(dataFilters);
  };

  const [filters, setFilters] = useState('?type=current_month');
  const { data: report, refetch, isLoading } = useGetReportMainQuery(filters);
  const [dataReportMain, setDataReportMain] = useState<any[]>([]);

  useEffect(() => {
    if (report?.data) {
      const dataResult = combineData(report.data);
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

  return (
    <>
      {/* <div className="flex flex-row items-center"> */}
      {/*   <SgButton label={t('refresh')} onClickAction={refresh} /> */}
      {/* </div> */}
      {/* <SgButton label={t('print')} onClickAction={printChart} /> */}
      <FilterDates onChange={refresh} />
      {!!isLoading && <Skeleton variant="rectangular" height={218} />}
      {!isLoading && (
        <span>
          <SgAmchartCombined
            idDiv={idDiv}
            data={dataReportMain}
            axis={axisReportMain}
            series={seriesReportMain}
            category="date"
          />
        </span>
      )}
    </>
  );
};
