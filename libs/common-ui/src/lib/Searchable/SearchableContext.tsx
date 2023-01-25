import React from 'react';

export interface ISeachableContext {
  query: string;
  setQuery: (selected: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}
const defaultContext: ISeachableContext = {
  query: '',
  setQuery: () => {},
  open: false,
  setOpen: () => {},
};

const SearchableContext = React.createContext<ISeachableContext>(defaultContext);

export function SearchableProvider({ children, query, setQuery, open, setOpen }: any) {
  const value = {
    query,
    setQuery,
    open,
    setOpen,
  };
  return <SearchableContext.Provider value={value}>{children}</SearchableContext.Provider>;
}

export function useSearchableContext() {
  const context = React.useContext(SearchableContext);
  if (!context) {
    throw new Error('Compound components cannot be rendered outside the component');
  }
  return context;
}
