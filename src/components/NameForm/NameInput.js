import React, { Component } from 'react';

class NameInput extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    this.props.onInputChange(event.target.value);
  }

  render () {
    return (
      <label>
        Name:
        <input type="text" value={this.props.name} onChange={this.handleChange}/>
      </label>
    );
  }
}
export default NameInput;