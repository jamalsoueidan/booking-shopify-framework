import React from 'react';
import { render } from '@testing-library/react';
import { BasicDatePickerInput } from './date-picker-input.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicDatePickerInput />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
