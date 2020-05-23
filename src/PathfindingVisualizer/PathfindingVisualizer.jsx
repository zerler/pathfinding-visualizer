import React, { Component } from 'react';

import './PathfindingVisualizer.css';
import Grid from './Grid/Grid';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';

const START_NODE_ROW = 9;
const START_NODE_COL = 15;
const END_NODE_ROW = 9;
const END_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      startNode: null,
      endNode: null
    };
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return false;
    const newGrid = toggleIsWall(this.state.grid, row, col);
    this.setState({grid: newGrid});
    return true;
  }

  handleMouseDown(row, col) {
    this.setState({ mouseIsPressed: true });
    this.setState({ grid: toggleIsWall(this.state.grid, row, col) });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  componentDidMount() {
    const grid = getInitialGrid();
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    this.setState({ grid });
    this.setState({ startNode });
    this.setState({ endNode });
  }

  render() {
    return (
      <div className="root" onMouseUp={ () => this.handleMouseUp() }>
        <Grid 
          onMouseDown={ (row, col) => this.handleMouseDown(row, col) }
          onMouseEnter={ (row, col) => this.handleMouseEnter(row, col) }
        />
        <div className="buttonWrapper">
          <button onClick={() => visualizeDijkstra(this.state.grid, this.state.startNode, this.state.endNode)}>
            Visualize Dijkstra's Algorithm
          </button>
        </div>
      </div>
    );
  }
}

const toggleIsWall = (grid, row, col) => {
  const toggledArray = [];
  for (let i = 0; i < grid.length; i++) {
    toggledArray.push( grid[i].slice() );
  }
  toggledArray[row][col].isWall = !toggledArray[row][col].isWall;
  return toggledArray;
};

const visualizeDijkstra = (grid, startNode, endNode) => {
  dijkstra(grid, startNode, endNode);
  const result = getNodesInShortestPathOrder(endNode);
  colorPath(result);
};

const colorPath = path => {
  path.forEach(box => {
    const boxRef = document.querySelector(`#node-${box.row}-${box.col}`);
    if (boxRef != null && !boxRef.className.includes('start-node') && !boxRef.className.includes('end-node')) {
      boxRef.className = 'node path-node';
    }
  });
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 18; row++) {
    const currentRow = [];
    for (let col = 0; col < 49; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: (row === START_NODE_ROW && col === START_NODE_COL),
    isEnd: (row === END_NODE_ROW && col === END_NODE_COL),
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null
  };
}