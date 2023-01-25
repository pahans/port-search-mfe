import useSWR from 'swr';
import fetcher from './fetcher';

const PORTS_API_URL = `${process.env['NX_OCEAN_API_URL']}/ports`;

export type ShippingPort = {
  code: string;
  name: string;
};

export default function usePorts() {
  const { data, error } = useSWR<ShippingPort[]>(PORTS_API_URL, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
