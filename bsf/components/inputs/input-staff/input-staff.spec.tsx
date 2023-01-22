import React from 'react';
import { render } from '@testing-library/react';
import { BasicInputStaff } from './input-staff.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicInputStaff />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
