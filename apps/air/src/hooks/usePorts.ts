import useSWR from 'swr';
import fetcher from './fetcher';

const PORTS_API_URL = `${process.env['NX_AIR_API_URL']}/airports`;

export type ShippingPort = {
  code: string;
  name: string;
};

const fallbackData = [
  {
    code: 'OSL',
    name: 'Oslo',
  },
  {
    code: 'SHA',
    name: 'Shanghai',
  },
  {
    code: 'JFK',
    name: 'New York',
  },
];

export default function usePorts() {
  const { data, error } = useSWR<ShippingPort[]>(PORTS_API_URL, fetcher, {
    fallbackData,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
