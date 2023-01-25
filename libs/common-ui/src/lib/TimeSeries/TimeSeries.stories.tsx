import { ComponentMeta } from '@storybook/react';

import TimeSeries from './TimeSeries';

export default {
  title: 'TimeSeries',
  component: TimeSeries,
} as ComponentMeta<typeof TimeSeries>;

export const Default = (): JSX.Element => {
  return <TimeSeries isLoading={false} data={[]} />;
};
