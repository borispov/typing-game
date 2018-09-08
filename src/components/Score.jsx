import React from 'react'

const Score = props => {
  const { cpm, grossWPM } = props.score
  const { name } = props
  const users = [{ name, cpm, grossWPM }]
  return (
    <div className="stats">
      {/* <p>{props.gameOn && cpm} </p> */}
      <div className="scoreboard">
        <div className="scoreboard__labels">
          <p> Name </p>
          <p> CPM </p>
          <p> WPM </p>
        </div>

        {users.map(usr => {
          return (
            <div className="scoreboard__users">
              <p>{usr.name}</p>
              <p>{usr.cpm}</p>
              <p>{usr.grossWPM}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Score
