import React, { Component } from 'react';

import './PathfindingVisualizer.css';
import Grid from './Grid/Grid';
import { dijkstra, getShortestPath } from '../algorithms/dijkstra';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const END_NODE_ROW = 10;
const END_NODE_COL = 35;

export default class PathfindingVisualizer extends Component{
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      startNode: null,
      endNode: null
    };
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
      <div>
        <button onClick={() => visualizeDijkstra(this.state.grid, this.state.startNode, this.state.endNode)}>
          Visualize Dijkstra's Algorithm
        </button>
        <Grid />
      </div>
    );
  }
}

const visualizeDijkstra = (grid, startNode, endNode) => {
  
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
}

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
  }
}