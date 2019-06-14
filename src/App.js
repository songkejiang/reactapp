import React from 'react';
import {Button} from 'antd-mobile';
import {configure} from 'mobx';
import {Provider} from 'mobx-react';
// import Test from './componens/Toast/index'
import './api/http'
import Model from './componens/Model/index'
import Store from './store/index'
import { GlobalStyle} from '@/assets/css/style.js'
import Input from '@/commen/Input.js'
import Form from '@/commen/Form.js'
import Router from '@/routes/index';

configure({'enforceActions': 'always'});
function App() {
  return (
    <Provider {...Store}>
      <div className="App">
        <GlobalStyle/>
        <Router></Router>
      </div>
    </Provider>
  );
}

export default App;
