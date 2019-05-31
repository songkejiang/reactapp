import React from 'react';
import {Button} from 'antd-mobile';
// import Test from './componens/canlendar/index'
import './api/http'
import Model from './componens/Model/index'
import './App.css'
function App() {
  return (
    <div className="App">
      {/* <Button>sdfsdf</Button> */}
    <Button type="primary">按钮</Button>
      { /*<ToastExample></ToastExample>
     {/* <Test></Test> */}
     <Model></Model>
     {/* <Toast icon="loading" show={true}>Loading...</Toast> */}
    </div>
  );
}

export default App;
