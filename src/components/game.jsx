import React, { Component } from "react"
import Score from "./gamecomp/score"
import SubmitButton from "./gamecomp/submit"
import InputBar from "./gamecomp/inputBar"

export default class Game extends Component {
  state = {
    inputStatus: {
      started: "Match The Text Above ASAP!",
      pregame: "Press Enter To Start"
    }
  }

  passData = e => {
    let userText = e.target.value.toString()
    userText !== "" && this.props.dataTransfer(userText, "userText")
    if (userText === "" && !this.props.gameOn) {
      this.props.dataTransfer(true, "startGame")
    } else if (!userText && this.props.gameOn) {
      console.log("Please Type anything")
    }
  }

  render() {
    return (
      <div className="userInput">
        <InputBar
          gameOn={this.props.gameOn}
          inputStatus={this.state.inputStatus}
          passData={this.passData}
        />
        <SubmitButton />
        <Score score={this.props.score} />
      </div>
    )
  }
}
