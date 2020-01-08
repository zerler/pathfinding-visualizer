import React, { Component } from 'react';
import './Grid.css';
import Node from '../Node/Node.jsx';

const START_NODE_ROW = 9;
const START_NODE_COL = 15;
const END_NODE_ROW = 9;
const END_NODE_COL = 35;

export default class Grid extends Component {
  createGrid = () => {
    let grid = [];

    // outer loop to create 18 rows
    for (let i = 0; i < 18; i++) {
      let row = [];
      // inner loop to create 49 columns
      for (let j = 0; j < 49; j++) {
        let type = this.determineType(i, j);
        row.push(<Node row={i} col={j} type={type}/>);
      }
      grid.push(<div key={i} className='row'>{row}</div>);
    }

    return grid;
  }

  determineType = (row, col) => {
    if (row === START_NODE_ROW && col === START_NODE_COL) {
      return 'start';
    } else if (row === END_NODE_ROW && col === END_NODE_COL) {
      return 'end';
    }
    return '';
  }

  render() {
    return (
      <div className="grid">
        { this.createGrid() }
      </div>
    );
  }
}