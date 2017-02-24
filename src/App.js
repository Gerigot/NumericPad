import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NumericPad from './component/NumericPad';

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    number: '0',
    isOpen: false,
  };
}  
  render() {
    const onNumberChange = (value) => {
      this.setState({number: value});
    }
    const openClick = () => {
      this.setState({isOpen: true});
    }
    const close = () => {
      this.setState({isOpen: false});
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          test it clicking on this: <span onClick={openClick}>{this.state.number}</span> you'll receive a string and this is the Number converted {Number(this.state.number)}
        </p>
        <NumericPad isOpen={this.state.isOpen} number={this.state.number} onChange={onNumberChange} onClose={close}/>
      </div>
    );
  }
}

export default App;
