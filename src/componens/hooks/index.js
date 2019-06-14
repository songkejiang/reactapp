import React, { useState } from 'react';
import {Button} from 'antd-mobile';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import {RouteWithSubRoutes} from '@/routes/index';

// function RouteWithSubRoutes(route) {
//     return (
//       <Route
//         path={route.path}
//         render={props => (
//           // pass the sub-routes down to keep nesting
//           <route.component {...props} routes={route.routes} />
//         )}
//       />
//     );
//   }
function Hooks({routes}) {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <Link to="/hooks/bus">Tacos</Link>
      <Link to="/hooks/cart">Tacos</Link>
      {/* <Button onClick={() => {props.history.push('/hooks/bus')}}>按钮</Button> */}
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </div>
  );
}
export default Hooks