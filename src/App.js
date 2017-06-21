import React, { Component } from 'react';
import NumericPad from './component/NumericPad';

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    number: '0',
    number2: '0',
    isOpen: false,
    isOpen2: false,
  };
}  
  render() {
    const onNumberChange = (value) => {
      this.setState({number: value});
    }
    const openClick = () => {
      this.setState({isOpen: true});
    }
    const onNumber2Change = (value) => {
      this.setState({number2: value});
    }
    const openClick2 = () => {
      this.setState({isOpen2: true});
    }
    const close = () => {
      this.setState({isOpen: false});
    }
    const close2 = () => {
      this.setState({isOpen2: false});
    }
    return (
      <div className="App">
        <p className="App-intro">
          test it clicking on this: <span onClick={openClick}>{this.state.number}</span> you'll receive a string and this is the Number converted {Number(this.state.number)}
        </p>
        <input type="text" onFocus={openClick} readOnly value={this.state.number}/>
        <NumericPad isOpen={this.state.isOpen} number={this.state.number} onChange={onNumberChange} onClose={close}/>
        <input type="text" onFocus={openClick2} readOnly value={this.state.number2}/>
        <NumericPad isOpen={this.state.isOpen2} number={this.state.number2} onChange={onNumber2Change} onClose={close2}/>
      </div>
    );
  }
}

export default App;
