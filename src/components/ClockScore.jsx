import React, { Component } from 'react';

export default class ClockScore extends Component {
  state = {
    startTime: Date.now(),
    currentTime: 0,
  };

  timer = () => {
    const time = ((Date.now() - this.state.startTime) / 1000).toFixed(3);
    this.setState(() => ({ currentTime: time }));
  };

  componentDidMount() {
    this.clocking = setInterval(this.timer, 100);
  }

  componentWillUnmount() {
    clearInterval(this.clocking);
  }
  render() {
    return <div style={{ fontSize: '36px', color: 'white' }}>{this.state.currentTime}</div>;
  }
}
