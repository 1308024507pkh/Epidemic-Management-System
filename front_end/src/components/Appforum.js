import React from 'react';
import MainRouter from '../router'

import {BrowserRouter} from 'react-router-dom'
import thunk from 'redux-thunk'  // 分发异步action
import {Provider,} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import Reducers from '../reducers/index'


const store = createStore(
  Reducers,
  applyMiddleware(thunk)
)

function Appforum() {
  return (
    <BrowserRouter>
      <Provider store={ store }>  
        <div className="App">
          <MainRouter />
        </div>
    </Provider>
  </BrowserRouter>
  );
}

export default Appforum;
