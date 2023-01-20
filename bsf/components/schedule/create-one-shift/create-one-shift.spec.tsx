import React from 'react';
import { render } from '@testing-library/react';
import { BasicCreateOneShift } from './create-one-shift.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicCreateOneShift />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
