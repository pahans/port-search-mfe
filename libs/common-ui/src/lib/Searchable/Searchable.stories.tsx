import { ComponentMeta } from '@storybook/react';

import Searchable from './Searchable';
import { useState } from '@storybook/addons';

export default {
  title: 'Searchable',
  component: Searchable,
} as ComponentMeta<typeof Searchable>;

export const Default = (): JSX.Element => {
  const options: { [key: string]: string } = {
    NOOSL: 'Oslo',
    CNSGH: 'Shanghai',
    CNSTG: 'Shantou',
    NLRTM: 'Rotterdam',
    DEHAM: 'Hamburg',
    GBFXT: 'Felixstowe',
    USNYC: 'New York',
  };
  const [selected, setSelected] = useState('');
  return (
    <div>
      <Searchable
        options={options}
        placeholder="search"
        selected={selected}
        onSelect={(newSelected) => setSelected(newSelected)}
      ></Searchable>
    </div>
  );
};
