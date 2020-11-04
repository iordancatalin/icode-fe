import React, { useState } from 'react';
import { LAYOUT_TYPE_1 } from '../../../core/constants';

export const LayoutContext = React.createContext();

export function LayoutContextProviver({ children }) {
  const layoutState = useState(LAYOUT_TYPE_1);

  return (
    <LayoutContext.Provider value={layoutState}>
      {children}
    </LayoutContext.Provider>
  );
}
