import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import loadFontAwsoneIcons from './core/font-awsome';
import Header from './features/header/Header';

loadFontAwsoneIcons();

function App() {
  return (
    <BrowserRouter>
      <div className='app__container p-2'>
        <Header></Header>
      </div>
    </BrowserRouter>
  );
}

export default App;
