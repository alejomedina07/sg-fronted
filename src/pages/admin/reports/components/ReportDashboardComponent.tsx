import { useState } from 'react';
import {
  useGetReportDashboardQuery,
  useGetReportProductsQuery,
} from '../redux/api/reportApi';
import { SgAmchartDonut } from '../../components/chart/SgAmchartDonut';
import { Skeleton } from '@mui/material';
import { FilterDates } from '../../components/share/filters/FilterDates';
import { SgAmchartCombined } from '../../components/chart/SgAmchartCombined';
import {
  axisReportProducts,
  seriesReportProducts,
} from '../helpers/reportProductsConst';

export const ReportDashboardComponent = () => {
  const refresh = (dataFilters: any) => {
    if (dataFilters === filters) {
      refetch();
      refetchProducts();
    }
    setFilters(dataFilters);
  };

  const [filters, setFilters] = useState('?type=current_month');
  const { data, refetch, isLoading } = useGetReportDashboardQuery(filters);
  const {
    data: dataProducts,
    refetch: refetchProducts,
    isLoading: isLoadingProducts,
  } = useGetReportProductsQuery(filters);

  console.log('dataProducts::', dataProducts);

  return (
    <>
      <FilterDates onChange={refresh} />
      {!!isLoading && (
        <>
          <div className="flex flex-col sm:flex-row items-center">
            <Skeleton
              className="flex-1 mx-4"
              variant="rectangular"
              height={218}
            />
            <Skeleton
              className="flex-1 mx-4"
              variant="rectangular"
              height={218}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center">
            <Skeleton
              className="flex-1 mx-4"
              variant="rectangular"
              height={218}
            />
          </div>
        </>
      )}
      <div className="flex flex-col md:flex-row items-center">
        {!!data?.data?.service && (
          <span className="w-full m-2 border border-blue-300 shadow rounded-md p-4 flex-1 text-center">
            <span>Servicios</span>
            <SgAmchartDonut
              idDiv="serviceDashboard"
              data={data?.data?.service || []}
              valueName="amount"
              categoryName="name"
            />
          </span>
        )}
        {!!data?.data?.expense && (
          <span className="w-full m-2 border border-blue-300 shadow rounded-md p-4 flex-1 text-center">
            <span>Gestos</span>
            <SgAmchartDonut
              idDiv="expenseDashboard"
              data={data?.data?.expense || []}
              valueName="amount"
              categoryName="name"
            />
          </span>
        )}
      </div>
      <div className="m-8"> Productos </div>
      <div className="flex flex-col sm:flex-row items-center">
        {!isLoadingProducts && (
          <span className="w-full mx-2 border border-blue-300 shadow rounded-md p-4 flex-1 text-center">
            <SgAmchartCombined
              idDiv="graph-combined-products"
              data={dataProducts?.data || []}
              axis={axisReportProducts}
              series={seriesReportProducts}
              category="product"
            />
          </span>
        )}
      </div>
    </>
  );
};
