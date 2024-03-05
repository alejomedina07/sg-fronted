// import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line,  ResponsiveContainer, Scatter,  Tooltip, XAxis, YAxis } from "recharts";

export interface SgComposedChartProps {
  data: any[];
  title: string;
  dataKeyXAxis: string;
  YAxisLeft: string;
  YAxisRight?: string;
  types: TypesComposedChart[];
}

export interface TypesComposedChart {
  type: 'Area' | 'Bar' | 'Line';
  dataKey: string;
  yAxisId: string;
  fill: string;
  stroke: string;
}

export const SgComposedChart = (props: SgComposedChartProps) => {
  const { data, title, dataKeyXAxis, types, YAxisLeft, YAxisRight } = props;
  //
  //
  // if (!data || data.length === 0) {
  //   return <div>No data available</div>;
  // }
  //
  // const xAxisDataKeyExists = data[0].hasOwnProperty(dataKeyXAxis);
  // if (!xAxisDataKeyExists) {
  //   return <div>X axis data key not found</div>;
  // }

  return (
    <>
      <span>{title}</span>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      {/*   <ComposedChart */}
      {/*     width={800} */}
      {/*     height={250} */}
      {/*     data={data} */}
      {/*     margin={{ */}
      {/*       top: 20, */}
      {/*       right: 20, */}
      {/*       bottom: 20, */}
      {/*       left: 20, */}
      {/*     }} */}
      {/*     > */}
      {/*     <XAxis dataKey={dataKeyXAxis} scale="band"/> */}
      {/*     <YAxis yAxisId={YAxisLeft}/> */}
      {/*     { !!YAxisRight && ( <YAxis yAxisId={YAxisRight} orientation="right" /> ) } */}
      {/*     <Tooltip /> */}
      {/*     <Legend /> */}
      {/*     <CartesianGrid stroke="#9dd9ff" /> */}
      {/*     { */}
      {/*       types.map( (type) => { */}
      {/*         if (type.type === 'Area') return ( <Area key={type.dataKey} yAxisId={type.yAxisId} type="monotone" dataKey={type.dataKey} fill={type.fill} stroke={type.stroke} /> ) */}
      {/*         if (type.type === 'Bar') return ( <Bar key={type.dataKey}  yAxisId="count" dataKey={type.dataKey} barSize={20} fill={type.fill} /> ) */}
      {/*         if (type.type === 'Line') return ( <Line key={type.dataKey}  yAxisId={type.yAxisId} type="monotone" dataKey={type.dataKey} stroke={type.stroke} />  ) */}
      {/*       }) */}
      {/*     } */}
      {/*   </ComposedChart> */}
      {/* </ResponsiveContainer> */}
    </>
  );
};
