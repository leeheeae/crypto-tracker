import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';

interface ChartProps {
  coinId: string | undefined;
}

const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data: endData } = useQuery(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId),
  );
  return <div>차트</div>;
};

export default Chart;
