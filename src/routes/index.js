import React from 'react';
// import {HashRouter, Route, Switch} from 'react-router-dom';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import asyncComponents from './asyncComponents'
import loadable from 'loadable-components'
const Hooks = loadable(() => import('@/componens/hooks/index'))
const Bus = loadable(() => import('@/componens/hooks/bus'))
const Cart = loadable(() => import('@/componens/hooks/cart'))
const Index = loadable(() => import('@/componens/index/index'))
export function RouteWithSubRoutes(route) {
    return (
      <Route
        path={route.path}
        render={props => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes} />
        )}
      />
    );
  }
  const routes = [
    {
      path: "/",
      exact: true,
      component: Index
    },
    {
      path: "/hooks",
      component: Hooks,
      routes: [
        {
          path: "/hooks/bus",
          component: Bus
        },
        {
          path: "/hooks/cart",
          component: Cart
        }
      ]
    }
  ];
const BasicRoute = () => (
    <Router>
        <Switch>
        {routes.map((route, i) => {
         return <RouteWithSubRoutes key={i} {...route} />
        }
        )}
        </Switch>
    </Router>
);

export default BasicRoute;