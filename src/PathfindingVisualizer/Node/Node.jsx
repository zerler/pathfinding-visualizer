import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
  render() {
    const {
      col,
      row,
      type
    } = this.props;
    
    let nodeClassName = 'node';
    if (type === 'start') {
      nodeClassName = nodeClassName.concat(' start-node');
    } else if (type === 'end') {
      nodeClassName = nodeClassName.concat(' end-node');
    }

    return (
      <div
        id={`node-${row}-${col}`}
        className={`${nodeClassName}`} >
      </div>
    );
  }
}