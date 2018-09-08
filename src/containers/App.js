import React, { Fragment, Component } from 'react'
import ShowText from '../components/ShowText'
import Game from '../components/Game'
import axios from 'axios'
import Loader from '../components/UI/Loading'
import DisplayName from '../components/DisplayName'
import Score from '../components/Score'
import Instructions from '../components/UI/Instructions'
import Rules from '../components/UI/Rules'
import Social from '../components/UI/Social'

/*            
Next Features Should Be: 
Scoreboard with: Display Name CPM and WPM  --- hardcoded for now.
Add CSS.. Animations.. Colors.. stuffZ
*/

/*
Implementing a username: 
*/

class App extends Component {
  state = {
    userName: null,
    gameOn: false,
    generatedText: null,
    time: 0,
    score: {
      correctWords: 0,
      cpm: null,
      grossWPM: null
    },
    numOfClicks: null,
    numOfErrors: null,
    quotesBank: [],
    isLoading: false,
    userInput: null
  }

  async componentDidMount() {
    // arrray for testing, to avoid POST requests overload.
    // const quotesArray = [
    //   'I am from the Simpsons Show',
    //   ' I Love Chocolate',
    //   "I am a I'm Robot Fanboy",
    //   'ILoveJS'
    // ]
    this.setState({ isLoading: true })
    let quotesArray = await axios.get('https://talaikis.com/api/quotes/')
    this.setState(() => ({
      // quotesBank: quotesArray,
      quotesBank: quotesArray.data.map(q => q.quote),
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

  calc_CPM = () => {
    const clicks = this.state.numOfClicks
    const seconds = this.state.time
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
    // type === 'score' && this.setState({ score: data })
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
        isLoading: false,
        numOfClicks: 0
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
    type === 'userName' && this.setState({ userName: childData })
  }

  render() {
    const isLoading = this.state.isLoading
    return (
      <div className="container">
        <Instructions />
        <Rules />
        <Social />
        <h1>SpeedTyping Game</h1>
        {!this.state.userName ? (
          <DisplayName passUserName={this.getDataChild} />
        ) : (
          <Fragment>
            {
              <h3 className="welcome">
                Hello {this.state.userName}! Welcome aboard
              </h3>
            }
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
            />
          </Fragment>
        )}
        <Score
          score={this.state.score}
          name={this.state.userName}
          gameOn={this.state.gameOn}
        />
      </div>
    )
  }
}

export default App
