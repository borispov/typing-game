import React, { Fragment, Component } from 'react'
import If from './If.js'
import ErrorMsg from './ErrorMsg'

class InputBar extends Component {
  state = {
    numOfKeysPressed: 0,
    isInputEmpty: null,
    // The message to pass down to errorMsg component, if the input is empty.
    theMsg: " It's Empty. Type Anything, Yo!"
  }

  // regE = new RegExp('^[a-zA-Z0-9,.!? ]*$')
  isValidKey = n => {
    console.log(n)
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

  handleInput = e => {
    // if the game has started, and user passes Blank Input, warn him.
    // Set the state 'isInputEmpty' to true, and render ErrorMsg.
    if (e.target.value === '' && this.props.gameOn) {
      // let inputState = this.state.isInputEmpty
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
        <p>{this.state.numOfKeysPressed}</p>
        <If
          condition={this.state.isInputEmpty}
          then={<ErrorMsg msg={this.state.theMsg} />}
          else={null}
        />
        <input
          ref={el => (this.inputEl = el)}
          type="text"
          placeholder={
            this.props.gameOn
              ? this.props.inputStatus.started
              : this.props.inputStatus.pregame
          }
          className="userInput__input"
          onKeyUp={e => {
            this.props.gameOn
              ? this.isValidKey(e.which) &&
                this.setState(prev => ({
                  numOfKeysPressed: prev.numOfKeysPressed + 1
                }))
              : null,
              (e.key === 'Enter' && this.handleInput(e)) ||
                (e.key === 'Escape' && this.alert('Esc Pressed'))
          }}
        />
      </Fragment>
    )
  }
}

export default InputBar
