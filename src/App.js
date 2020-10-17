import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import loadFontAwsoneIcons from './core/font-awsome';
import ICode from './features/code/ICode';
import Header from './features/header/Header';

loadFontAwsoneIcons();

function App() {
  return (
    <BrowserRouter>
      <div className='app__container p-2'>
        <Header></Header>

        <div className='d-flex flex-grow-1'>
          <Switch>
            <Route path='/'>
              <ICode></ICode>
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
