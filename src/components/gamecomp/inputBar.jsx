import React, { Fragment } from "react"

const inputBar = props => {
  // Method to reset the input value once submitted
  const resetForm = () => {
    this.inputEl.value = ""
  }

  const handleInput = e => {
    props.passData(e)
    resetForm()
  }

  return (
    <Fragment>
      <input
        ref={el => (this.inputEl = el)}
        type="text"
        name="match"
        placeholder={
          props.gameOn ? props.inputStatus.started : props.inputStatus.pregame
        }
        className="userInput__input"
        onKeyUp={e =>
          (e.key === "Enter" && handleInput(e)) ||
          (e.key === "Escape" && alert("Esc Pressed"))
        }
      />
    </Fragment>
  )
}

export default inputBar
