import React from 'react';
import { roles } from './roles';

export function ReturnsCorrectValue() {
  return <div>{roles()}</div>;
}
