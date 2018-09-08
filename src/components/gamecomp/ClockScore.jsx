import React, { Component } from 'react'

export default class ClockScore extends Component {
  state = {
    startTime: Date.now(),
    currentTime: 0
  }

  timer = () => {
    // time = 60 means Time's Over.
    const time = (Date.now() - this.state.startTime) / 1000
    if (time >= 60) this.props.passTime(60, 'time')
    this.setState(() => ({ currentTime: time.toFixed(1) }))
  }

  componentDidMount() {
    this.clocking = setInterval(this.timer, 100)
  }

  componentWillUnmount() {
    let time = ~~this.state.currentTime
    this.props.passTime(time, 'time')
    clearInterval(this.clocking)
  }
  render() {
    return (
      <div className="timer" style={{ fontSize: '1.2rem', color: 'white' }}>
        <p className="timer__title">Time's Running</p>
        <span className="timer__clock">{this.state.currentTime}</span>{' '}
        <span className="timer__seconds">s</span>
      </div>
    )
  }
}
