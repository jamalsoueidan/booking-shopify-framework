import React from 'react';
import { render } from '@testing-library/react';
import { BasicUseTag } from './use-tag.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicUseTag />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
