import React from 'react';
import './App.css';
 
class Dttm extends React.Component {
  state={
    curDT : new Date().toLocaleString(),
  }
  render(){
    return (
      <div className="App">
        <p>As of: {this.state.curDT}</p>
      </div>
    );
  }
}
 
export default Dttm;