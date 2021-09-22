import React, { Component } from 'react';
import Zju from '../../asserts/image/timgXFIKOJKO.png'

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <img src={Zju}></img> 
      </div>
      
    );
  }
}

export default Body;
