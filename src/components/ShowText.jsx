import React from "react"

const ShowText = props => {
  return (
    <div className="gameText">
      <p className="gameText__text">{props.currentText}</p>
    </div>
  )
}

export default ShowText
