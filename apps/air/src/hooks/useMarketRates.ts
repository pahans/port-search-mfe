import useSWR from 'swr';
import fetcher from './fetcher';

const MARKET_RATES_API_URL = `${process.env['NX_AIR_API_URL']}/rates`;

export default function useMarketRates(origin: string, destination: string) {
  const { data, error } = useSWR(
    `${MARKET_RATES_API_URL}?origin=${origin}&destination=${destination}`,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
