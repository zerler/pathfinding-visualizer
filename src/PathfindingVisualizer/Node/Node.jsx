import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
  constructor() {
    super();
    
    this.state = {
      isWall: false
    };
  }

  handleMouseDown() {
    if (!this.state.isStart && !this.state.isEnd) this.setState({isWall: !this.state.isWall});
  }

  render() {
    const { col, row, type } = this.props;

    let nodeClassName = 'node';
    if (type === 'start') {
      nodeClassName = nodeClassName.concat(' start-node');
    } else if (type === 'end') {
      nodeClassName = nodeClassName.concat(' end-node');
    } else if (this.state.isWall) {
      nodeClassName = nodeClassName.concat(' wall-node');
    }

    return (
      <div
        id={`node-${row}-${col}`}
        className={`${nodeClassName}`}
        onMouseDown={() => this.handleMouseDown()} >
      </div>
    );
  }
}