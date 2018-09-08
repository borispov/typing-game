import React, { Fragment } from 'react'

const DisplayName = props => {
  const submitHandler = e => {
    e.preventDefault()
    props.passUserName(e.target.value, 'userName')
    this.inputText.value = ''
  }
  return (
    <Fragment>
      <input
        autoFocus={true}
        ref={input => (this.inputText = input)}
        className="displayName"
        // className="userinput__input"
        type="text"
        placeholder="Choose your nickname"
        onKeyUp={e => (e.key === 'Enter' ? submitHandler(e) : null)}
      />
    </Fragment>
  )
}

export default DisplayName
