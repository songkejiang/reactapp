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
// function Hooks({routes}) {
//   const [count, setCount] = useState(0);
//   const [count2, setCount2] = useState(0);
//   function  handelClick() {
//       setCount(count => count+1);
//       setCount(count => count+2);
//       setCount(count => count+3);
//       setTimeout(() => {
//       console.log(count)
//       handelClick2()
//       }, 2000);
//   }
//   function  handelClick2() {
//     // setCount2(count2 => count2+1);
//     console.log(count)
// }
//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={handelClick}>
//         Click me
//       </button>
//       <button onClick={handelClick2}>
//         Click me
//       </button>
//       <Link to="/hooks/bus">Tacos</Link>
//       <Link to="/hooks/cart">Tacos</Link>
//       {/* <Button onClick={() => {props.history.push('/hooks/bus')}}>按钮</Button> */}
//       {routes.map((route, i) => (   
//         <RouteWithSubRoutes key={i} {...route} />
//       ))}
//     </div>
//   );
// }
/* eslint-disable */
let id = 0
function Hooks({routes}) {
let name,setName;
  let count,setCount;
  
  id += 1;
  console.log(id & 1)
  if (id & 1) {
    // 奇数
    [count, setCount] = useState(0)
    [name, setName] = useState('小智')
  } else {
    // 偶数
    [name, setName] = useState('小智')
    [count, setCount] = useState(0)
  }

  return (
    <div>
          <button type="button"
      onClick={() => {setCount(count + 1) }}
    >
      Click({count}), name ({name})
    </button>
     <Link to="/hooks/bus">Tacos</Link>
     <Link to="/hooks/cart">Tacos</Link>
     {/* <Button onClick={() => {props.history.push('/hooks/bus')}}>按钮</Button> */}
     {routes.map((route, i) => (   
       <RouteWithSubRoutes key={i} {...route} />
     ))}
    </div>

  )
     }
export default Hooks
