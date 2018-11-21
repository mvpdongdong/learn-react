import React, { Component } from 'react';

class SyntheticEvent extends Component {
  state = {
    search: ''
  };

  handleChange = event => {
    event.persist();
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState({
        search: event.target.value
      });
    }, 250);
  }

  render () {
    return (
      <div>
        <input onChange={this.handleChange}></input>
        {this.state.search ? <p>Search for: {this.state.search}</p> : null}
      </div>
    );
  }
}

export default SyntheticEvent;
