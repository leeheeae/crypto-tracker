import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string | undefined;
}

const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data: endData } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
  );
  return (
    <div>
      {isLoading ? (
        'loading Chart...'
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: 'sales',
              data: endData?.map((price) => price.close) as number[],
            },
          ]}
          options={{
            chart: {
              height: 500,
              width: 500,
            },
            stroke: {
              curve: 'smooth',
              width: 3,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              categories: endData?.map((price) => price.time_close),
            },
            fill: {
              type: 'gradient',
              gradient: { gradientToColors: ['#0be881'] },
            },
            colors: ['blue'],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
