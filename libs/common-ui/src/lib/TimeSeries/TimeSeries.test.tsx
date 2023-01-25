import React from 'react';
import { render } from '@testing-library/react';

import TimeSeries from './TimeSeries';

describe('TimeSeries', () => {
  test('renders TimeSeries component', () => {
    render(<TimeSeries data={[]} isLoading={false} />);
  });
});
