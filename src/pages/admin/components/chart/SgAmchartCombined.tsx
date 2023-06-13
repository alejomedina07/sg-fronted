import { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { AxisValues } from './SgAmchart';
import { ColumnSeries, LineSeries } from '@amcharts/amcharts4/charts';

am4core.useTheme(am4themes_animated);

interface SgAmchartCombinedProps {
  data: any[];
  axis: AxisValues;
  series: any[];
}

export const SgAmchartCombined = (props: SgAmchartCombinedProps) => {
  const { data, axis, series } = props;
  useEffect(() => {
    // Create chart instance
    const chart = am4core.create('chartdiv', am4charts.XYChart);

    // Add data
    chart.data = data;

    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.align = 'right';
    chart.exporting.menu.verticalAlign = 'top';

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = 'date';
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.labels.template.rotation = -60;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let { leftAxis, rightAxis } = axis;

    let valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis1.title.text = leftAxis;

    let valueAxis2: any;
    if (rightAxis) {
      valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis2.title.text = rightAxis;
      valueAxis2.renderer.opposite = true;
      valueAxis2.renderer.grid.template.disabled = true;
    }

    series.forEach((item, index) => {
      let serie: ColumnSeries | LineSeries =
        item.type === 'Column'
          ? chart.series.push(new am4charts.ColumnSeries())
          : chart.series.push(new am4charts.LineSeries());

      serie.dataFields.valueY = item.valueY;
      serie.dataFields.categoryX = item.dateX;
      serie.yAxis = rightAxis && item.yAxisRight ? valueAxis2 : valueAxis1;
      serie.name = item.name;
      serie.tooltipText = item.tooltipText;
      serie.strokeWidth = item.strokeWidth;

      if (serie instanceof ColumnSeries) {
        // serie.fill = chart.colors.getIndex(index);
        serie.fill = item.fill;
        serie.clustered = item.clustered;
        if (item.width)
          serie.columns.template.width = am4core.percent(item.width);
        if (item.toBack) serie.toBack();
      } else if (serie instanceof LineSeries) {
        serie.tensionX = item.tensionX;
        serie.stroke = item.fill;
        if (item.strokeDasharray) serie.strokeDasharray = item.strokeDasharray;

        let bullet = serie.bullets.push(new am4charts.CircleBullet());
        bullet.circle.radius = item.bullet.radius;
        bullet.circle.strokeWidth = item.bullet.strokeWidth;
        bullet.circle.fill = am4core.color(item.bullet.fill || '#fff');
      }
    });

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    // Add legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = 'top';

    // Add scrollbar
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    // chart.scrollbarX.series.push(series1);
    // chart.scrollbarX.series.push(series3);
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    return () => {
      chart.dispose();
    };
  }, [data]);

  return <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>;
};
