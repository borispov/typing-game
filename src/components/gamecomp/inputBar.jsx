import React, { Fragment, Component } from 'react'
import If from './If.js'
// import ErrorMsg from './ErrorMsg'

class InputBar extends Component {
  state = {
    numOfKeysPressed: 0,
    isInputEmpty: null,
    // The message to pass down to errorMsg component, if the input is empty.
    theMsg: " It's Empty. Type Anything, Yo!",
    inputStatus: {
      err: " It's Empty. Type Anything, Yo!",
      started: 'Match The Text Above ASAP!',
      pregame: 'Press Enter To Start'
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
        {/* <If
          condition={this.state.isInputEmpty}
          then={<ErrorMsg msg={this.state.theMsg} />}
          else={null}
        /> */}
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
              (e.key === 'Escape' && this.passNumOfKeys())
          }}
        />
      </Fragment>
    )
  }
}

export default InputBar
