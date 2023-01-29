import useSWR from 'swr';
import fetcher from './fetcher';

const MARKET_RATES_API_URL = `${process.env['NX_OCEAN_API_URL']}/rates`;

export default function useMarketRates(origin: string, destination: string) {
  const shouldFetch = origin && destination;
  const { data, error } = useSWR(
    shouldFetch
      ? `${MARKET_RATES_API_URL}?origin=${origin}&destination=${destination}`
      : null,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
