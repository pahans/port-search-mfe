import React from 'react';

export type SeachableContext = {
  query: string;
  setQuery: (selected: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};
const defaultContext: SeachableContext = {
  query: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setQuery: () => {},
  open: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setOpen: () => {},
};

const SearchableContext = React.createContext<SeachableContext>(defaultContext);

export function SearchableProvider({
  children,
  query,
  setQuery,
  open,
  setOpen,
}: React.PropsWithChildren<SeachableContext>) {
  const value = {
    query,
    setQuery,
    open,
    setOpen,
  };
  return (
    <SearchableContext.Provider value={value}>
      {children}
    </SearchableContext.Provider>
  );
}

export function useSearchableContext() {
  const context = React.useContext(SearchableContext);
  if (!context) {
    throw new Error(
      'Compound components cannot be rendered outside the component'
    );
  }
  return context;
}
