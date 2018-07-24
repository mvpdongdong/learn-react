import React, { Component } from 'react';
import NameInput from './NameInput';
import Select from './Select';

class NameForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      flavor: 'coconut'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange (val) {
    this.setState({
      name: val.toUpperCase()
    });
  }

  handleSelectChange (val) {
    this.setState({
      flavor: val
    });
  }

  handleSubmit (event) {
    event.preventDefault();
    alert(`A name was submitted: ${this.state.name}, flavor: ${this.state.flavor}`);
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <NameInput name={this.state.name} onInputChange={this.handleInputChange}/>
        <br/>
        <Select flavor={this.state.flavor} onSelectChange={this.handleSelectChange}/>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

export default NameForm;