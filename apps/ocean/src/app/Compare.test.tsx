import { render, screen } from '@testing-library/react';
import Compare from './Compare';

import usePorts from '../hooks/usePorts';
jest.mock('../hooks/usePorts');

const mockUsePorts = usePorts as jest.MockedFunction<typeof usePorts>;

describe('Compare', () => {
  it('Can render results from API on searchbox', async () => {
    mockUsePorts.mockReturnValue({
      data: [
        { code: 'NOOSL', name: 'Oslo' },
        { code: 'CNSGH', name: 'Shanghai' },
      ],
      isLoading: false,
      isError: false,
    });
    render(<Compare />);
    expect(await screen.getAllByText('Shanghai')).toHaveLength(2);
    expect(await screen.getAllByText('Oslo')).toHaveLength(2);
  });
});
