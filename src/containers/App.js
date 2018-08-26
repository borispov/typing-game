import React, { Component } from "react"
import TextGen from "../components/textGen"
import Game from "../components/game"

class App extends Component {
  state = {
    generatedText: null,
    userInput: null,
    score: 0,
    gameOn: false,
    getText: false
  }

  // compare user's input text with the generated Text collection
  compareText = (user, txt) => {
    if (user && txt) {
      let score = 0
      user === txt ? ++score : --score
      console.log(score, user, txt)
      this.setState(prevState => ({
        score: prevState.score + score
      }))
    } else {
      console.log("some object is empty")
    }
  }

  getDataChild = (childData, type) => {
    switch (type) {
      case "startGame":
        this.setState(() => ({ gameOn: childData, getText: true }))
        console.log("go!")
        break
      case "genText":
        console.log("Hello from genText", childData)
        this.setState(() => ({ generatedText: childData, getText: false }))
        setTimeout(
          this.compareText(this.state.userInput, this.state.generatedText),
          1000
        )
        break
      case "userText":
        console.log("userText case, your input is: ", childData)
        this.setState(() => ({ userInput: childData, getText: true }))
        break
      // not sure what is this case even doing, I think nothing.
      case "score":
        this.setState(prevState => {
          return { score: prevState.score + childData }
        })
        break
    }
  }

  render() {
    console.log(this.state.generatedText)
    // if (this.state.userInput)
    //   this.compareText(this.state.userInput, this.state.generatedText)
    return (
      <div className="container">
        <h1>SpeedTyping Game</h1>
        <h2>Welcome</h2>
        {this.state.gameOn ? (
          <TextGen
            getText={this.state.getText}
            dataTransfer={this.getDataChild}
            currentText={this.state.generatedText}
          />
        ) : (
          <div className="gameText" />
        )}
        <Game
          gameOn={this.state.gameOn}
          dataTransfer={this.getDataChild}
          score={this.state.score}
          compareHandler={this.compareText}
        />
      </div>
    )
  }
}

export default App
