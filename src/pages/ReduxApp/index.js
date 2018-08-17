import React, { Component } from 'react';
import Card from '~/components/Card';
import Footer from '~/components/Todo/Footer';
import AddTodo from '~/containers/Todo/AddTodo';
import VisibleTodoList from '~/containers/Todo/VisibleTodoList';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '~/reducers/combineTodo';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class ReduxApp extends Component {
  render () {
    return (
      <Provider store={store}>
        <Card>
          <AddTodo />
          <VisibleTodoList />
          <Footer />
        </Card>
      </Provider>
    );
  }
}

export default ReduxApp;
