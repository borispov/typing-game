import React, { Component } from "react"
import ShowText from "../components/ShowText"
import Game from "../components/Game"
import axios from "axios"
import Loader from "../components/Loading"

class App extends Component {
  state = {
    generatedText: null,
    userInput: null,
    score: 0,
    gameOn: false,
    getText: false, // Check whether to generate new word or Not. if not - usually waiting for User inputs.
    justStarted: false, // First Round.
    quotesBank: [],
    isLoading: false
  }

  async componentDidMount() {
    // arrray for testing, to avoid POST requests overload.
    const quotesArray = [
      "I am from the Simpsons Show",
      " I Love Chocolate",
      "I am a I'm Robot Fanboy",
      "ILoveJS"
    ]
    this.setState({ isLoading: true })
    // let quotesArray = await axios.get("https://talaikis.com/api/quotes/")
    this.setState(() => ({
      quotesBank: quotesArray,
      // quotesBank: quotesArray.data.map(q => q.quote),
      isLoading: false
    }))
  }

  // compare user's input text with the generated Text collection
  compareText = (user, txt) => {
    console.log(user, txt, user === txt)
    user &&
      txt &&
      user === txt &&
      this.setState(prev => ({ score: prev.score + 1 }))
    this.selectQuote()
  }

  selectQuote = () => {
    const { quotesBank } = this.state
    const randIndex = Math.floor(Math.random() * quotesBank.length)
    const quote = quotesBank[randIndex]
    quotesBank.splice(randIndex, 1)
    this.setState(() => {
      return {
        quotesBank,
        generatedText: quote
      }
    })
  }

  // the callback function we use to Retrieve data from Child Components back to the parent.
  getDataChild = (childData, type) => {
    switch (type) {
      case "startGame":
        this.selectQuote()
        this.setState(() => ({
          gameOn: childData,
          getText: true,
          justStarted: true,
          isLoading: false
        }))
        break

      case "genText":
        this.setState(() => ({
          generatedText: childData,
          getText: true,
          justStarted: false
        }))
        break

      case "userText":
        // -- this is the first method of comparing the Input with the generated quote
        // -- this stores user's input in the state.
        // this.setState(
        //   () => ({ userInput: childData, getText: true }),
        //   (() => {
        //     setTimeout(() => {
        //       this.compareText(this.state.userInput, this.state.generatedText)
        //     }, 300)
        //   })()
        // )
        // 2nd Method: Compare user input data without storing it in the state. I think it's Faster.
        this.setState({ getText: true })
        this.compareText(childData, this.state.generatedText)
        break
    }
  }

  render() {
    // -- At first I compared inputs in the render method. doesn't seem like a good idea.
    // if (this.state.userInput)
    //   this.compareText(this.state.userInput, this.state.generatedText)
    const isLoading = this.state.isLoading
    return (
      <div className="container">
        <h1>SpeedTyping Game</h1>
        {isLoading && <Loader />}
        {this.state.gameOn ? (
          <ShowText
            // getText={this.state.getText}
            // dataTransfer={this.getDataChild}
            currentText={this.state.generatedText}
          />
        ) : (
          <div className="gameText" /> // Cheap Trick to avoid my CSS Margins fuck-ups
        )}
        <Game
          gameOn={this.state.gameOn}
          dataTransfer={this.getDataChild}
          score={this.state.score}
        />
      </div>
    )
  }
}

export default App
