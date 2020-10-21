import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { LayoutContextProviver } from './core/contexts/LayoutContext';
import loadFontAwsoneIcons from './core/font-awsome';
import ICode from './features/code/ICode';
import HeaderComponent from './features/header/HeaderComponent';

loadFontAwsoneIcons();

function App() {
  return (
    <BrowserRouter>
      <LayoutContextProviver>
        <div className='app__container p-2'>
          <HeaderComponent />

          <div className='d-flex flex-grow-1'>
            <Switch>
              <Route path='/'>
                <ICode></ICode>
              </Route>
            </Switch>
          </div>
        </div>
      </LayoutContextProviver>
    </BrowserRouter>
  );
}

export default App;
