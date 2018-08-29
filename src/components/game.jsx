import React from 'react';
import Score from './gamecomp/Score';
import SubmitButton from './gamecomp/Submit';
import InputBar from './gamecomp/InputBar';
import ClockScore from './ClockScore';

const Game = (props) => {
  const inputStatus = {
    started: 'Match The Text Above ASAP!',
    pregame: 'Press Enter To Start',
  };

  const passData = (e) => {
    const userText = e.target.value.toString();
    userText !== '' && props.gameOn && props.dataTransfer(userText, 'userText');
    userText === '' && !props.gameOn && props.dataTransfer(true, 'startGame');
  };

  return (
    <div className="userInput">
      <InputBar gameOn={props.gameOn} inputStatus={inputStatus} passData={passData} />
      {/* {props.gameOn && <ClockScore />} */}
      {/* <SubmitButton /> */}
      <Score score={props.score} />
    </div>
  );
};

export default Game;
