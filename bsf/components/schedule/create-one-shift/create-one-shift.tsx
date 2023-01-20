import React, { ReactNode } from 'react';

export type CreateOneShiftProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function CreateOneShift({ children }: CreateOneShiftProps) {
  return (
    <div>
      {children}
    </div>
  );
}
