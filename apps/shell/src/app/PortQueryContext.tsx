import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

type PortQuery = {
  origin?: string;
  destination?: string;
};

const initQueryContext = {
  origin: '',
  destination: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPortQuery: () => {},
};

type PortQueryContextType = {
  origin: string;
  destination: string;
  setPortQuery: ({ origin, destination }: PortQuery) => void;
};

export const PortQueryContext =
  React.createContext<PortQueryContextType>(initQueryContext);

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentOrigin = searchParams.get('origin') || '';
  const currentDestination = searchParams.get('destination') || '';

  const setPortQuery = useCallback(
    ({
      origin = currentOrigin,
      destination = currentDestination,
    }: PortQuery) => {
      const newParams = new URLSearchParams({
        origin,
        destination,
      });
      setSearchParams(newParams.toString());
    },
    [currentOrigin, currentDestination, setSearchParams]
  );

  const value = {
    origin: currentOrigin || '',
    destination: currentDestination || '',
    setPortQuery,
  };

  return (
    <PortQueryContext.Provider value={value}>
      {children}
    </PortQueryContext.Provider>
  );
}

export function usePortQuery() {
  const context = React.useContext(PortQueryContext);
  if (context === undefined) {
    throw new Error('usePortQuery must be used within a QueryProvider');
  }
  return context;
}
