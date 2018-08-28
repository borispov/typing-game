import React, { Fragment, Component } from "react"
import If from "./If.js"
import ErrorMsg from "./ErrorMsg"

class InputBar extends Component {
  state = {
    isInputEmpty: null,
    // The message to pass down to errorMsg component, if the input is empty.
    theMsg: " It's Empty. Type Anything, Yo!"
  }

  // Method to reset the input value once submitted
  resetForm = () => {
    this.inputEl.value = ""
  }

  handleInput = e => {
    // if the game has started, and user passes Blank Input, warn him.
    // Set the state 'isInputEmpty' to true, and render ErrorMsg.
    if (e.target.value === "" && this.props.gameOn) {
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
          onKeyUp={e =>
            (e.key === "Enter" && this.handleInput(e)) ||
            (e.key === "Escape" && this.alert("Esc Pressed"))
          }
        />
      </Fragment>
    )
  }
}

export default InputBar
