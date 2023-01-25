import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Searchable from './Searchable';

const options: { [key: string]: string } = {
  NOOSL: 'Oslo',
  CNSGH: 'Shanghai',
  CNSTG: 'Shantou',
  NLRTM: 'Rotterdam',
  DEHAM: 'Hamburg',
  GBFXT: 'Felixstowe',
  USNYC: 'New York',
};

describe('Searchable', () => {
  test('filters options', () => {
    render(
      <div className="w-full">
        <Searchable
          options={options}
          placeholder="search"
          selected=""
          onSelect={() => {}}
        ></Searchable>
      </div>
    );
    fireEvent.click(screen.getByRole('textbox'));
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'oslo' },
    });
    expect(screen.queryByText('New York')).toBeNull();
    expect(screen.queryByText('Oslo')).toBeVisible();
  });
});
