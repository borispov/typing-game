import React, { Component } from 'react'

export default class ClockScore extends Component {
  state = {
    startTime: Date.now(),
    currentTime: 0
  }

  timer = () => {
    const time = (Date.now() - this.state.startTime) / 1000
    if (time >= 30) this.props.passTime(30, 'time')
    this.setState(() => ({ currentTime: time.toFixed(1) }))
  }

  mimer = () => {
    const time = ((Date.now() - this.state.startTime) / 1000).toFixed(0)
    this.props.passTime(time, 'time')
  }

  componentDidMount() {
    this.clocking = setInterval(this.timer, 100)
    this.timing = setInterval(this.mimer, 1000)
  }

  componentWillUnmount() {
    let time = ~~this.state.currentTime
    this.props.passTime(time, 'time')
    clearInterval(this.clocking, this.timing)
  }
  render() {
    return (
      <div className="timer">
        <p className="timer__title">Time's Running</p>
        <span className="timer__clock">{this.state.currentTime}</span>{' '}
        <span className="timer__seconds">s</span>
      </div>
    )
  }
}
