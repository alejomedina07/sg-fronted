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

    // let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = 'date';
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let { leftAxis, rightAxis } = axis;

    console.log(9999, leftAxis);
    console.log(rightAxis);

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
      console.log(777, serie.dataFields);
      // serie.dataFields.dateX = item.dateX;
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

    // let valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
    // let valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis1.title.text = leftAxis.title;
    //
    // let valueAxis2;
    // valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis2.title.text = 'Market Days';
    // valueAxis2.renderer.opposite = true;
    // valueAxis2.renderer.grid.template.disabled = true;
    // // if (axis.rightAxis) {
    // // }
    // // Create series

    // let series1 = chart.series.push(new am4charts.ColumnSeries());
    // series1.dataFields.valueY = 'sales1';
    // series1.dataFields.dateX = 'date';
    // series1.yAxis = valueAxis1;
    // series1.name = 'Target Sales';
    // series1.tooltipText = '{name}\n[bold font-size: 20]${valueY}M[/]';
    // series1.fill = chart.colors.getIndex(0);
    // series1.strokeWidth = 0;
    // series1.clustered = false;
    // series1.columns.template.width = am4core.percent(40);
    //
    // let series2 = chart.series.push(new am4charts.ColumnSeries());
    // series2.dataFields.valueY = 'sales2';
    // series2.dataFields.dateX = 'date';
    // series2.yAxis = valueAxis1;
    // series2.name = 'Actual Sales';
    // series2.tooltipText = '{name}\n[bold font-size: 20]${valueY}M[/]';
    // series2.fill = chart.colors.getIndex(0).lighten(0.5);
    // series2.strokeWidth = 0;
    // series2.clustered = false;
    // series2.toBack();
    //
    // let series3 = chart.series.push(new am4charts.LineSeries());
    // series3.dataFields.valueY = 'market1';
    // series3.dataFields.dateX = 'date';
    // series3.name = 'Market Days';
    // series3.strokeWidth = 2;
    // series3.tensionX = 0.7;
    // series3.yAxis = valueAxis2;
    // series3.tooltipText = '{name}\n[bold font-size: 20]{valueY}[/]';
    //
    // let bullet3 = series3.bullets.push(new am4charts.CircleBullet());
    // bullet3.circle.radius = 3;
    // bullet3.circle.strokeWidth = 2;
    // bullet3.circle.fill = am4core.color('#fff');
    //
    // let series4 = chart.series.push(new am4charts.LineSeries());
    // series4.dataFields.valueY = 'market2';
    // series4.dataFields.dateX = 'date';
    // series4.name = 'Market Days ALL';
    // series4.strokeWidth = 2;
    // series4.tensionX = 0.7;
    // series4.yAxis = valueAxis2;
    // series4.tooltipText = '{name}\n[bold font-size: 20]{valueY}[/]';
    // series4.stroke = chart.colors.getIndex(0).lighten(0.5);
    // series4.strokeDasharray = '3,3';
    //
    // let bullet4 = series4.bullets.push(new am4charts.CircleBullet());
    // bullet4.circle.radius = 3;
    // bullet4.circle.strokeWidth = 2;
    // bullet4.circle.fill = am4core.color('#fff');

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
