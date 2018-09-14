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
CSS: Transitions/Animations, Responsive Web Design 
Backend: Implement MongoDB database, probably with Express Server. 
*/

class App extends Component {
  // I think that's a lot of state and probably can shrink it down.
  //
  state = {
    userName: null,
    gameOn: false,
    generatedText: null,
    prevText: null,
    time: 0,
    score: {
      cpm: null, // characters per minute
      grossWPM: null, // Words Per Minute without error count
      netWPM: null // Words Per Minute considering errors.
    },
    numOfClicks: null,
    numOfErrors: null, // num of errors in the current piece of text ( quote ) ~ gets cleared once the quote changes.
    totErrors: null,
    quotesBank: [],
    isLoading: false
  }

  // If the quote is changed, store the previous quote in state,
  componentWillUpdate(nextProps, nextState) {
    const nextText = nextState.generatedText
    const current = this.state.generatedText
    if (current && current !== nextText) {
      this.setState({ prevText: current })
    }
  }

  // get New piece of text -- add the sum of errors from last text to the total errors state.
  // it's triggered via callback that is passed way down to InputBar Component - by 'Enter'
  newText = () => {
    if (this.state.prevText !== this.state.generatedText) {
      this.setState(prev => ({
        totErrors: prev.totErrors + this.state.numOfErrors
      }))
    }
    this.selectQuote()
  }

  // fetch data from quote API ~ async func to wait for the data to arrive and set it to state.
  async componentDidMount() {
    this.setState({ isLoading: true })
    let quotesArray = await axios.get('https://talaikis.com/api/quotes/')
    this.setState(() => ({
      quotesBank: quotesArray.data.map(q => q.quote),
      isLoading: false
    }))
  }

  // function to calculate errors. async / await is basically for testing.
  evaluate = async (usr, txt) => {
    const userArray = usr.split(' ').slice(0, -1)
    const txtArray = txt.split(' ')
    const errors = userArray.reduce((errors, currentWord, index) => {
      return currentWord !== txtArray[index] ? errors + 1 : errors
    }, 0)
    await this.setState(prev => ({ numOfErrors: errors }))
  }

  // calc_CPM - first set all the errors in the totErrors state.
  // Then - calculate the CPM and netWPM and set the score in the state
  // clear the errors - so the next'round' starts off with clear Errors state.
  calc_CPM = async () => {
    await this.setState(prev => ({
      totErrors: prev.totErrors + this.state.numOfErrors
    }))
    const { numOfClicks, time, totErrors } = this.state
    const errorRate = totErrors / (time / 60)
    const cpm = numOfClicks / (time / 60)
    const grossWPM = numOfClicks / 5 / (time / 60)
    const netWPM = grossWPM - errorRate
    console.log(netWPM)
    console.log(this.state.totErrors)
    this.setState(prevState => ({
      ...prevState,
      score: {
        cpm: cpm,
        grossWPM: grossWPM,
        netWPM: netWPM
      },
      numOfErrors: 0,
      totErrors: 0,
      isLoading: false
    }))
  }

  // Method passed to Child Components to get SCORES pass back to Parent.
  retrieveScore = (data, type) => {
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
    type === 'evaluate' && this.evaluate(childData, this.state.generatedText)
    type === 'userText' && this.newText(childData, this.state.generatedText)
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
        <h1 className="title">SpeedTyping Game</h1>
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
        <Instructions />
        <Rules />

        <Score
          score={this.state.score}
          name={this.state.userName}
          gameOn={this.state.gameOn}
        />
        <Social />
      </div>
    )
  }
}

export default App
