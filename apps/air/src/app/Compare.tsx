import {
  Button,
  Searchable,
  TimeSeries,
  usePortQuery,
} from '@comparativo/common-ui';
import styled from 'styled-components';
import { SwapHorizontal } from '@styled-icons/ionicons-outline';
import useMarketRates from '../hooks/useMarketRates';
import usePorts from '../hooks/usePorts';

const SearchGroupContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const SearchGroup = styled.div`
  display: flex;
`;

const SwapButton = styled(Button)`
  position: absolute;
  background-color: #771dff;
  color: white;
  left: 50%;
  height: 30px;
  border-radius: 50%;
  width: 30px;
  transform: translate(-50%, 0);
  &:hover {
    opacity: 0.8;
    background-color: #771dff;
  }
`;

const SwapIconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function Compare() {
  const { origin, destination, setPortQuery } = usePortQuery();
  const { data: ports } = usePorts();
  const originPortOptions: { [key: string]: string } = {};
  const dstPortOptions: { [key: string]: string } = {};

  const { data: rates, isLoading } = useMarketRates(origin, destination);
  ports?.forEach((port) => {
    if (port.code !== origin) {
      dstPortOptions[port.code] = port.name;
    }
    if (port.code !== destination) {
      originPortOptions[port.code] = port.name;
    }
  });

  return (
    <div>
      <SearchGroupContainer>
        <SearchGroup>
          <Searchable
            options={originPortOptions}
            selected={origin}
            onSelect={(newOrigin) => {
              setPortQuery({ origin: newOrigin });
            }}
            placeholder="Origin"
          ></Searchable>
          <SwapButton
            onClick={() => {
              setPortQuery({ origin: destination, destination: origin });
            }}
          >
            <SwapIconContainer>
              <SwapHorizontal />
            </SwapIconContainer>
          </SwapButton>
          <Searchable
            options={dstPortOptions}
            selected={destination}
            data-testid="destination-search"
            onSelect={(newDestination) => {
              setPortQuery({ destination: newDestination });
            }}
            placeholder="Destination"
          ></Searchable>
        </SearchGroup>
      </SearchGroupContainer>
      <div>
        {rates?.message ? (
          <h1>{rates.message}</h1>
        ) : (
          <TimeSeries data={rates} isLoading={isLoading}></TimeSeries>
        )}
      </div>
    </div>
  );
}

export default Compare;
