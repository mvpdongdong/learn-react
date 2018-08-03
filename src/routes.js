import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './pages/Home';
import Example from './pages/Example';
import Comment from './pages/Comment';

const RouterMap = () => (
  <Router>
    <div>
      <ul className="header-nav">
        <MenuLink to="/" label='首页' activeOnlyWhenExact/>
        <MenuLink to="/example" label='例子'/>
        <MenuLink to="/comment" label="评论"/>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/example" component={Example} />
        <Route path="/comment" component={Comment} />
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
