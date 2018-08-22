import React, { Component } from 'react';
import Card from '~/components/Card';
import Footer from '~/components/Todo/Footer';
import AddTodo from '~/containers/Todo/AddTodo';
import VisibleTodoList from '~/containers/Todo/VisibleTodoList';

class ReduxApp extends Component {
  render () {
    return (
      <Card>
        <AddTodo/>
        <VisibleTodoList/>
        <Footer/>
      </Card>
    );
  }
}

export default ReduxApp;
