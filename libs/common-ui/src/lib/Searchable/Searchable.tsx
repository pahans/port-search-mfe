import { useEffect, useReducer, useRef } from 'react';
import styled from 'styled-components';
import useOutsideClick from '../../hooks/useOutsideClick';

export type SearchableProps = {
  options: { [key: string]: string };
  selected: string;
  onSelect: (selected: string) => void;
  placeholder: string;
};
const Dropdown = styled.div`
  width: 10.5em;
  margin: 5px 0px;
`;
const Input = styled.input`
  background: white;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  margin: 0px;
  width: calc(100% - 40px);
  padding: 16px 20px;
`;

const DropDownListContainer = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: absolute;
  z-index: 100;
  width: 10.5em;
`;
const DropDownList = styled.ul`
  position: absolute;
  background-color: white;
  border: 1px solid #dadada;
  border-radius: 0 0 5px 5px;
  border-top: none;
  font-family: sans-serif;
  padding: 0;
  width: 100%;
  max-height: 10rem;
  overflow-y: auto;
  margin: 0;
  border-bottom-left-radius: 0.375rem;
  list-style: none;
`;

const Option = styled.li`
  background-color: white;
  padding: 8px;
  margin-bottom: 1px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #e5e7eb;
  }
`;

type SearchReducerState = {
  open: boolean;
  selected: string | undefined;
  query: string | undefined;
};

type SearchAction = {
  type: SearchActionKind;
  payload?: string;
  query?: string;
};

enum SearchActionKind {
  SET_OPEN = 'SET_OPEN',
  SET_SELECTED = 'SET_SELECTED',
  SET_CLOSED = 'SET_CLOSED',
  SET_QUERY = 'SET_QUERY',
}

const searchReducer = (state: SearchReducerState, action: SearchAction) => {
  console.log(state, action);
  switch (action.type) {
    case 'SET_OPEN':
      return { ...state, open: true };
    case 'SET_SELECTED':
      return {
        ...state,
        selected: action.payload,
        open: false,
        query: action.query,
      };
    case 'SET_CLOSED':
      return { ...state, open: false };
    case 'SET_QUERY':
      return { ...state, query: action.query };
    default:
      return state;
  }
};

const Searchable = ({
  options,
  selected,
  placeholder,
  onSelect,
}: SearchableProps): JSX.Element => {
  const [state, dispatch] = useReducer(searchReducer, {
    open: false,
    selected: selected,
    query: '',
  });
  const filteredOptions: { [key: string]: string } = {};

  for (const key in options) {
    if (
      options[key].toLowerCase().includes((state?.query || '').toLowerCase())
    ) {
      filteredOptions[key] = options[key];
    }
  }

  const ref = useRef<HTMLInputElement>(null);

  useOutsideClick(ref, () => dispatch({ type: SearchActionKind.SET_CLOSED }));

  return (
    <Dropdown ref={ref}>
      <Input
        placeholder={placeholder}
        onClick={() => {
          dispatch({ type: SearchActionKind.SET_OPEN });
        }}
        onChange={(e) => {
          if (e.target.value === '') {
            onSelect('');
          }
          dispatch({ type: SearchActionKind.SET_QUERY, query: e.target.value });
        }}
        value={state.query || options[selected]}
        role="combobox"
      />
      {
        <DropDownListContainer visible={state.open}>
          <DropDownList role="listbox">
            {Object.keys(filteredOptions).map((key) => (
              <Option
                key={key}
                onClick={() => {
                  onSelect(key);
                  dispatch({
                    type: SearchActionKind.SET_SELECTED,
                    payload: key,
                    query: options[key],
                  });
                }}
              >
                {options[key]}
              </Option>
            ))}
          </DropDownList>
        </DropDownListContainer>
      }
    </Dropdown>
  );
};

export default Searchable;
