import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeStoreContext } from '../../core/contexts/ThemeStoreContext';
import { DARK_THEME, findTheme, LIGHT_THEME } from '../../core/themes';

const ThemeOption = styled.button.attrs(() => ({
  className: 'rounded',
}))`
  width: 180px;
  height: 150px;
  border: 0;
  box-shadow: 0 0 10px #000;

  svg {
    font-size: 3rem;
  }
`;

const DarkThemeOption = styled(ThemeOption).attrs(() => ({
  className: 'mr-5',
}))`
  background-color: #1e1e1e;
  color: #dd5c71;
`;

const LightThemeOption = styled(ThemeOption).attrs(() => ({
  className: 'ml-5',
}))`
  background-color: #fff;
  color: #f07b3f;
`;

export default function Settings() {
  const setTheme = useContext(ThemeStoreContext);

  console.log(setTheme);

  const handleSetDarkTheme = () => setTheme(findTheme(DARK_THEME));

  const handleSetLightTheme = () => setTheme(findTheme(LIGHT_THEME));

  return (
    <div className='flex-grow-1 d-flex justify-content-center align-items-center'>
      <div>
        <DarkThemeOption onClick={handleSetDarkTheme}>
          <FontAwesomeIcon icon='moon'></FontAwesomeIcon>
        </DarkThemeOption>
        <LightThemeOption onClick={handleSetLightTheme}>
          <FontAwesomeIcon icon='sun'></FontAwesomeIcon>
        </LightThemeOption>
      </div>
    </div>
  );
}
