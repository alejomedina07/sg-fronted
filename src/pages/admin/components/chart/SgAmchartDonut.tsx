import { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

interface SgAmchartDonutProps {
  data: any[];
  idDiv: string;
  valueName: string;
  categoryName: string;
}

export const SgAmchartDonut = (props: SgAmchartDonutProps) => {
  const { data, idDiv, valueName, categoryName } = props;
  useEffect(() => {
    // Create chart instance
    const chart = am4core.create(idDiv, am4charts.PieChart);

    // Add data
    chart.data = data;
    chart.innerRadius = am4core.percent(50);

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    // pieSeries.dataFields.value = 'litres';
    // pieSeries.dataFields.category = 'country';
    pieSeries.dataFields.value = valueName;
    pieSeries.dataFields.category = categoryName;
    pieSeries.slices.template.stroke = am4core.color('#fff');
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
    return () => {
      chart.dispose();
    };
  }, [data]);
  return <div id={idDiv} style={{ width: '100%', height: '300px' }}></div>;
};
