import { render } from '@testing-library/react';
import Compare from './Compare';

describe('Compare', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Compare />);
    expect(baseElement).toBeTruthy();
  });
});
