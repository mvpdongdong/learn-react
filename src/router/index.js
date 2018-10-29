import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';
// import loadable from 'loadable-components';
import { Provider } from 'react-redux';
import LoadingProgress from '~/components/LoadingProgress';

const loadable = lazy;
const Home = loadable(() => import('~/pages/Home'));
const Example = loadable(() => import('~/pages/Example'));
const Comment = loadable(() => import('~/pages/Comment/reduxIndex'));
const ComponentPage = loadable(() => import('~/pages/Component'));
const ReduxApp = loadable(() => import('~/pages/ReduxApp'));

const RouterMap = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <ul className="header-nav">
          <MenuLink to="/" label='首页' activeOnlyWhenExact/>
          <MenuLink to="/example" label='例子'/>
          <MenuLink to="/comment" label="评论"/>
          <MenuLink to="/component" label="组件示例"/>
          <MenuLink to="/reduxApp" label="redux应用"/>
        </ul>
        <Suspense fallback={<LoadingProgress/>}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/example" component={Example}/>
            <Route path="/comment" component={Comment}/>
            <Route path="/component" component={ComponentPage}/>
            <Route path="/reduxApp" component={ReduxApp}/>
          </Switch>
        </Suspense>
      </div>
    </Router>
  </Provider>
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

export default hot(module)(RouterMap);
