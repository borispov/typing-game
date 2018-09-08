import React from 'react'
import InputBar from './gamecomp/InputBar'
import ClockScore from './gamecomp/ClockScore'

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
    </div>
  )
}

export default Game
