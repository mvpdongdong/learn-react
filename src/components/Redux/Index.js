import React, { Component } from 'react';
import Content from './Content';
import Header from './Header';

class Index extends Component {
  render () {
    return (
      <div>
        <Header />
        <Content />
      </div>
    );
  }
}

export default Index;
