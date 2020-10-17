import React from 'react';
import './ICode.css';

export default function ICode() {
  return (
    <div className='icode__grid-container px-2 font-montserrat text-secondary'>
      <div className='icode__html bg-dark d-flex justify-content-end p-2'>
        HTML
      </div>
      <div className='icode__css bg-dark d-flex justify-content-end p-2'>
        CSS
      </div>
      <div className='icode__js bg-dark d-flex justify-content-end p-2'>
        JS
      </div>
      <div className='icode__output bg-dark d-flex justify-content-center align-items-center'>
        No content to show here for the moment
      </div>
    </div>
  );
}
