import React, { Component } from 'react';
import Card from '~/components/Card';
import message from '~/components/Message';

class ComponentPage extends Component {

  handleClick = () => {
    message.success('hello');
  }

  render () {
    return (
      <div>
        <Card>
          <h2>message组件</h2>
          <button onClick={this.handleClick}>点击</button>
        </Card>
      </div>
    );
  }
}

export default ComponentPage;
