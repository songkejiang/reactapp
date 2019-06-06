import React from 'react';
import {Button} from 'antd-mobile';
import {configure} from 'mobx';
import {Provider} from 'mobx-react';
import Test from './componens/Toast/index'
import './api/http'
import Model from './componens/Model/index'
import Store from './store/index'
import { GlobalStyle} from '@/assets/css/style.js'
configure({'enforceActions': 'always'});
var meetup = new Test()
console.log(meetup.greet());
  meetup.myName = "Ragul";
  console.log(meetup.greet());
function App() {
  return (
    <Provider {...Store}>
      <div className="App">
        <GlobalStyle/>
      <Button type="primary">按钮</Button>
        {/* <Test></Test> */}
      <Model></Model>
      </div>
    </Provider>
  );
}

export default App;
