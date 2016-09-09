import React, { Component } from 'react'

export default class Footer extends Component {
  render () {
    const { className } = this.props

    return (
      <div className={`footer ${className || ''}`}>
        <div className='footer__writer'>Copyrigh by ricale.</div>
        {' '}
        <div className='footer__ccl'>
          <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">CC BY-NC-SA.</a>
        </div>
      </div>
    )
  }
}