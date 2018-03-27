import React, { Component } from 'react';
import DatePicker from './Components/DatePicker/datePicker';

import './App.css';

class App extends Component {
  render() {
    return (
      <DatePicker minYear={ 1350 }/>
    );
  }
}

export default App;
