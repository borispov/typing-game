import React, { Fragment, Component } from 'react'
import Clockscore from './ClockScore'

class InputBar extends Component {
  state = {
    numOfKeysPressed: 0,
    isInputEmpty: null,
    inputStatus: {
      err: " It's Empty. Type Anything, Yo!",
      started: 'Match The Text Above ASAP!',
      pregame: 'Press Enter To Start'
    },
    time: null
  }

  handleTime = (data, type) => {
    if (data === 30) {
      const userInput = this.inputEl.value
      this.props.passData(userInput, 'evaluate')
      this.props.passTime(data, type)
      this.passNumOfKeys()
    } else {
      this.setState({ time: data })
    }
  }

  isValidKey = n => {
    return (
      (n >= 65 && n <= 90) ||
      (n >= 97 && n <= 122) ||
      n === 190 ||
      n === 32 ||
      n === 188 ||
      n === 191 ||
      (n >= 44 && n <= 57)
    )
  }

  // Method to reset the input value once submitted
  resetForm = () => {
    this.inputEl.value = ''
  }

  passNumOfKeys = () => {
    let n = this.state.numOfKeysPressed
    // console.log(n)
    this.props.passData(n)
    this.setState({ numOfKeysPressed: 0 })
  }

  handleEscape = e => {
    this.props.passData(e.target.value, 'evaluate')
    this.passNumOfKeys()
    const time = this.state.time
    console.log(time)
    this.props.passTime(time, 'time')
  }

  handleSpace = e => {
    console.log('space clicked')
    this.props.passData(e.target.value, 'evaluate')
  }

  // handle Error of Blank input. else pass data.
  handleInput = e => {
    if (e.target.value === '' && this.props.gameOn) {
      this.setState({ isInputEmpty: true })
      return false
    } else {
      this.setState({ isInputEmpty: false })
      this.props.passData(e)
      this.resetForm()
    }
  }

  render() {
    return (
      <Fragment>
        <input
          ref={el => (this.inputEl = el)}
          autoFocus={true}
          type="text"
          placeholder={
            this.props.gameOn
              ? this.state.isInputEmpty
                ? this.state.inputStatus.err
                : this.props.inputStatus.started
              : this.props.inputStatus.pregame
          }
          className={
            (this.props.gameOn &&
              this.state.isInputEmpty &&
              'userinput__input -error') ||
            'userinput__input'
          }
          onKeyUp={e => {
            if (this.props.gameOn) {
              this.isValidKey(e.which)
                ? this.setState(prev => ({
                    numOfKeysPressed: prev.numOfKeysPressed + 1
                  }))
                : null
            }
            ;(e.key === 'Enter' && this.handleInput(e)) ||
              (e.which === 32 &&
                e.target.value.charCodeAt(e.target.value.length - 2) !== 32 &&
                this.handleSpace(e)) ||
              (e.key === 'Escape' && this.handleEscape(e))
          }}
        />
        {this.props.gameOn && <Clockscore passTime={this.handleTime} />}
      </Fragment>
    )
  }
}

export default InputBar
