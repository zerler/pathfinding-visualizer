import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isWall: false,
      isStart: props.type === 'start',
      isEnd: props.type === 'end'
    };
  }

  toggleIsWall() {
    if (this.state.isWall) {
      this.setState({ isWall: false });
    } else {
      this.setState({ isWall: true });
    }
  }

  handleMouseDown(row, col) {
    if (!this.state.isStart && !this.state.isEnd) this.toggleIsWall();
    this.props.onMouseDown(row, col);
  }

  handleMouseEnter(row, col) {
    if (this.props.onMouseEnter(row, col)) {
      this.toggleIsWall();
    }
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
        onMouseDown={() => this.handleMouseDown(row, col)}
        onMouseEnter={() => this.handleMouseEnter(row, col)} >
      </div>
    );
  }
}