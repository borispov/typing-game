import React, { Fragment } from "react"

const ErrorMsg = msg => {
  return (
    <Fragment>
      <h3 className="errorMsg">{msg.msg}</h3>
    </Fragment>
  )
}

export default ErrorMsg
