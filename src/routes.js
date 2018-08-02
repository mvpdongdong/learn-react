import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './pages/Home';
import Example from './pages/Example';

const RouterMap = () => (
  <Router>
    <div>
      <ul className="header-nav">
        <MenuLink to="/" label='Home' activeOnlyWhenExact/>
        <MenuLink to="/example" label='Example'/>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/example" component={Example} />
      </Switch>
    </div>
  </Router>
);

const MenuLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <li className={match ? 'is-active' : ''}>
        <Link to={to}>{label}</Link>
      </li>
    )}
  />
);

export default RouterMap;
