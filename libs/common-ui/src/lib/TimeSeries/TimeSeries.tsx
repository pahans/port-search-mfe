import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { memo } from 'react';

export type ITimeSeriesProps = {
  data: any[];
  isLoading: boolean;
};

interface ChartOptions extends Highcharts.Options {
  loading: any;
  series: any;
}

const DEFAULT_OPTIONS: Highcharts.Options = {
  title: {
    text: '',
  },
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  xAxis: {
    type: 'datetime',
  },
  yAxis: {
    title: {
      text: '',
    },
    labels: {
      format: '${text}',
    },
  },
  plotOptions: {
    line: {
      step: 'center',
      marker: {
        enabled: false,
      },
    },
  },
};

const TimeSeries = ({
  data = [],
  isLoading,
}: ITimeSeriesProps): JSX.Element => {
  const options: ChartOptions = {
    ...DEFAULT_OPTIONS,
    loading: isLoading,
    lang: {
      noData: 'No Data Available',
    },
    legend: {
      align: 'right',
      verticalAlign: 'top',
      layout: 'vertical',
      x: 0,
      y: 100,
    },
    series: [
      {
        data: [],
        type: 'line',
        id: 'low',
        name: 'Low',
      },
      {
        data: [],
        type: 'line',
        id: 'mean',
        name: 'Average',
      },
      {
        data: [],
        type: 'line',
        id: 'high',
        name: 'High',
      },
    ],
  };

  data.forEach((point) => {
    options.series[0].data.push({
      id: point.day,
      x: Date.parse(point.day),
      y: point.low,
    });
    options.series[1].data.push({
      id: point.day,
      x: Date.parse(point.day),
      y: point.mean,
    });
    options.series[2].data.push({
      id: point.day,
      x: Date.parse(point.day),
      y: point.high,
    });
  });
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default memo(TimeSeries);