import React from 'react'
import { FaFacebookF, FaLinkedinIn, FaGithubAlt } from 'react-icons/fa'
export default () => {
  return (
    <div className="social">
      <h3 className="social__title">Created By:</h3>
      <h3 className="social__title">Boris Povolotsky</h3>
      {/* <p className="social__about">
        I'm a junior web developer, located in Israel. Currently studying as
        much as I can absorb and looking for a job. */}
        <ul className="social__list">
          <li>
            <a href="http://facebook.com/povolotsky">
              <FaFacebookF className="social__item" />
            </a>
          </li>
          <li>
            <a href="http://github.com/borispov">
              <FaGithubAlt className="social__item" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/boris-povolotsky/">
              <FaLinkedinIn className="social__item" />
            </a>
          </li>
        </ul>
      {/* </p> */}
    </div>
  )
}
