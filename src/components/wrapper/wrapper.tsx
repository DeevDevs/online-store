import React from 'react';
import './wrapper.scss';
import spiderWeb from './../../static/bg-web.png';
import * as types from './../../staticData/baseTypes';
import Header from '../header/header';
import Footer from '../footer/Footer';

function Wrapper({ children }: types.WrapperProps) {
  return (
    <div className="wrapper">
      <img className="wrapper-web" src={spiderWeb} />
      <Header />
      <div className="wrapper__main">{children}</div>
      <Footer />
    </div>
  );
}

export default Wrapper;
