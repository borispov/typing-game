import React from 'react'
import InputBar from './gamecomp/InputBar'

const Game = props => {
  const inputStatus = {
    started: 'Match The Text Above ASAP!',
    pregame: 'Press Enter To Start'
  }

  const handleTime = (data, type) => {
    props.passTimeScore(data, type)
  }

  const passData = (e, purpose) => {
    if (purpose === 'evaluate') {
      console.log(purpose)
      props.gameOn && props.dataTransfer(e, 'evaluate')
    } else if (typeof e === 'number') {
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
        passTime={handleTime}
      />
    </div>
  )
}

export default Game
