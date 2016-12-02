'use strict';

// LIBRARIES
import React from 'react';
import ReactDOM from 'react-dom';
import Progress from 'react-progress';

// COMPONENTS
import Items from './components/Items';
// import ItemsTable from './components/ItemsTable';
import Viewer from './components/Viewer';
import Header from './components/Header';

// LOCAL DEPS
import fire from './chrome/sender';
import EVENTS from '../common/events';

// EXPORT MODULE
const renderer = {};
module.exports = renderer;

// for dev purpose
const inExtension = true;//chrome.runtime.onMessage;


const items = [];//require('../mydata')['data'];
const findProfile = (options) => fire(inExtension, renderApp, EVENTS.APP_TO_CONTENT_SCRIPT.PLACE_HOLDER, options);

// const handleReverseBackgroundOnClick = (options) => {
//   whiteBackground = options.whiteBackground;
//   renderApp();
// };

const initCall = () => {
  findProfile();
};

const renderApp = (err, data, init) => {

  const cb = init ? initCall : () => {};

  const clean = data ? data['data']  :items ;
  const loaded = clean.length > 0 ? true:false;
   ReactDOM.render(<Header categories={['Interest', 'Demographics']} loaded={loaded} />,
    document.getElementById('header')
  );
  console.log(clean.length)
  ReactDOM.render(<Viewer items={clean}/>,
    document.getElementById('main'),
    cb
  );

};


// rendering
renderer.renderApp = renderApp;
