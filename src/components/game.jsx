import React from 'react'
import Score from './gamecomp/Score'
import InputBar from './gamecomp/InputBar'
import ClockScore from './ClockScore'

const Game = props => {
  const inputStatus = {
    started: 'Match The Text Above ASAP!',
    pregame: 'Press Enter To Start'
  }

  const handleTime = (data, type) => {
    if (data === 60) props.dataTransfer(data, type)
    props.passTimeScore(data, type)
  }

  const passData = e => {
    console.log(typeof e)
    if (typeof e === 'number') {
      props.dataTransfer(e, 'time')
    } else {
      const userText = e.target.value.toString()
      userText !== '' &&
        props.gameOn &&
        props.dataTransfer(userText, 'userText')
      userText === '' && !props.gameOn && props.dataTransfer(true, 'startGame')
    }
  }

  return (
    <div className="userInput">
      <InputBar
        gameOn={props.gameOn}
        inputStatus={inputStatus}
        passData={passData}
      />
      {props.gameOn && <ClockScore passTime={handleTime} />}
      <Score score={props.score} />
    </div>
  )
}

export default Game
