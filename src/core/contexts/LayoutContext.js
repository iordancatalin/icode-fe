import React, { useState } from 'react';
import { LAYOUT_TYPE_1 } from '../constants';

export const LayoutContext = React.createContext();

export function LayoutContextProviver(props) {
  const layoutState = useState(LAYOUT_TYPE_1);

  return (
    <LayoutContext.Provider value={layoutState}>
      {props.children}
    </LayoutContext.Provider>
  );
}
