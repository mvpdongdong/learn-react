import React, { Component } from 'react';
import Card from '~/components/Card';
import Footer from '~/components/Todo/Footer';
import AddTodo from '~/containers/Todo/AddTodo';
import VisibleTodoList from '~/containers/Todo/VisibleTodoList';
import UndoRedo from '~/containers/Todo/UndoRedo';

class ReduxApp extends Component {
  render () {
    return (
      <Card>
        <AddTodo/>
        <VisibleTodoList/>
        <Footer/>
        <UndoRedo/>
      </Card>
    );
  }
}

export default ReduxApp;
