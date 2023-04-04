import { useGetServiceReportQuery }            from '../../appointment/redux/api/appointmentApi';
import { SgComposedChart, TypesComposedChart } from '../../appointment/components/SgComposedChart';

const data = [
  {
    name: 'Page A',
    uv: 590,
    pv: 800,
    amt: 1400,
    cnt: 4,
  },
  {
    name: 'Page B',
    uv: 868,
    pv: 967,
    amt: 1506,
    cnt: 5,
  },
  {
    name: 'Page C',
    uv: 1397,
    pv: 1098,
    amt: 989,
    cnt: 3,
  },
  {
    name: 'Page D',
    uv: 1480,
    pv: 1200,
    amt: 1228,
    cnt: 8,
  },
  {
    name: 'Page E',
    uv: 1520,
    pv: 1108,
    amt: 1100,
    cnt: 4,
  },
  {
    name: 'Page F',
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 3,
  },
];

const types: TypesComposedChart[] = [
  // {
  //   type: 'Area',
  //   yAxisId: 'main',
  //   fill:'#8884d8',
  //   stroke:'#3833a1',
  //   dataKey: 'amt'
  // },
  // {
  //   type: 'Bar',
  //   yAxisId: 'main',
  //   fill:'#413ea0',
  //   stroke:'#413ea0',
  //   dataKey: 'pv'
  // },
  // {
  //   type: 'Line',
  //   yAxisId: 'main',
  //   fill:'#ff7300',
  //   stroke:'#ff7300',
  //   dataKey: 'uv'
  // }
  {
    type: 'Bar',
    yAxisId: 'count',
    fill:'#8884d8',
    stroke:'#3833a1',
    dataKey: 'count'
  },
  {
    type: 'Line',
    yAxisId: 'main',
    fill:'#ff7300',
    stroke:'#ff7300',
    dataKey: 'total_amount'
  }
]

export const MainReports = () => {
  const { data: report } = useGetServiceReportQuery('')

  // console.log(1123, report);

  return (
    <>
      <div className="w-full" style={{ height: 500 }}>

        {report && report.data && report.data.length > 0 && (
          <SgComposedChart
            data={report.data || []}
            title="Gráfica de servicios"
            dataKeyXAxis="name"
            types={types}
            YAxisLeft="main"
            YAxisRight="count"
          />
        )}
      </div>
    </>
  );
};
