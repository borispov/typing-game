import React, { Component } from 'react'
import ShowText from '../components/ShowText'
import Game from '../components/Game'
import axios from 'axios'
import Loader from '../components/Loading'

class App extends Component {
  state = {
    gameOn: false,
    generatedText: null,
    time: 0,
    score: {
      correctWords: 0,
      cpm: 0,
      grossWPM: 0
    },
    numOfClicks: null,
    quotesBank: [],
    isLoading: false
  }

  async componentDidMount() {
    // arrray for testing, to avoid POST requests overload.
    const quotesArray = [
      'I am from the Simpsons Show',
      ' I Love Chocolate',
      "I am a I'm Robot Fanboy",
      'ILoveJS'
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
      this.setState(prev => ({ ...prev, score: prev.score + 1 }))
    this.selectQuote()
  }

  calc_CPM = (clicks = this.state.numOfClicks, seconds = this.state.time) => {
    // simple CPM and grossWPM Formula. not sure how to implement the Net WPM Formula.
    // let {cpm, grossWPM } = {...this.state.score}
    const cpm = clicks / (seconds / 60)
    const grossWPM = clicks / 5 / (seconds / 60)
    this.setState(prevState => ({
      ...prevState,
      score: {
        cpm: cpm,
        grossWPM: grossWPM
      },
      isLoading: false
    }))
  }

  // Method passed to Child Components to get SCORES pass back to Parent.
  retrieveScore = (data, type) => {
    type === 'score' && this.setState({ score: data })
    type === 'time' && this.setState({ time: data })
  }

  // Method to select random quote from the Quotes Array and Splice that item.
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
    type === 'startGame' &&
      (this.selectQuote(),
      this.setState({
        gameOn: childData,
        isLoading: false
      }))
    type === 'userText' && this.compareText(childData, this.state.generatedText)
    type === 'genText' && this.setState({ generatedText: childData })
    if (type === 'time') {
      this.setState({
        gameOn: false,
        numOfClicks: childData,
        isLoading: true
      })
      setTimeout(() => {
        this.calc_CPM()
      }, 1500)
    }
  }

  render() {
    const isLoading = this.state.isLoading
    return (
      <div className="container">
        <h1>SpeedTyping Game</h1>
        {isLoading && <Loader />}
        {this.state.gameOn ? (
          <ShowText currentText={this.state.generatedText} />
        ) : (
          <div className="gameText" />
        )}
        <Game
          passTimeScore={this.retrieveScore}
          gameOn={this.state.gameOn}
          dataTransfer={this.getDataChild}
          // score={this.state.score}
        />
      </div>
    )
  }
}

export default App
