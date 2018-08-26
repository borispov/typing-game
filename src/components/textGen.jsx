import React from "react"

const TextGen = props => {
  const HardText = ["goal", "shoot", "madman", "goothic"]

  let copy = HardText.slice(0)

  const getNewText = () => {
    return () => {
      if (copy.length < 1) {
        copy = HardText.slice(0)
      }
      let index = Math.floor(Math.random() * copy.length)
      let item = copy[index]
      copy.splice(index, 1)
      return item
    }
  }

  const data = getNewText()
  let value = data()
  if (props.getText) {
    props.dataTransfer(value, "genText")
  }

  return (
    <div className="gameText">
      <p className="gameText__text">{props.currentText}</p>
    </div>
  )
}

export default TextGen
