import React from "react"

const Score = props => {
  return (
    <div className="stats">
      <p className="score">
        Score: <span className="score__points">{props.score}</span>
      </p>
    </div>
  )
}

export default Score
