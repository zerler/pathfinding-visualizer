import React, { Component } from 'react';

import './PathfindingVisualizer.css';
import Grid from './Grid/Grid'

export default class PathfindingVisualizer extends Component{
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Grid />
      </div>
    );
  }
}