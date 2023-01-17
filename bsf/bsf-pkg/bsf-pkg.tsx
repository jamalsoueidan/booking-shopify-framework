import React, { ReactNode } from 'react';

export type BsfPkgProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function BsfPkg({ children }: BsfPkgProps) {
  return (
    <div>
      {children}
    </div>
  );
}
