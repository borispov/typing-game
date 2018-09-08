import React from 'react'

export default () => {
  return (
    <div className="rules">
      <h3>Rules:</h3>
      <ol>
        <li>You've got 60 seconds!</li>
        <li>
          You can press <strong>ESC</strong> to stop the game. Your score will
          be evaluated.
        </li>
        <li>
          <strong>CPM</strong> is characters per minute
        </li>
        <li>
          <strong>WPM</strong> is words per minute, grossWPM doesn't take into
          account accuracy, meaning it doesn't doesn't calculate errors
        </li>
      </ol>
    </div>
  )
}
