import React, { Component } from 'react'
import { LOADING_INDICATOR_IMAGE_PATH } from '../../constants/commons'

export default class LoadingIndicator extends Component {
  static defaultProps = {
    position: 'absolute',
    top: '0px',
    left: '0px',

    width: "100%",
    height: "400px",

    backgroundColor: "#333",
    opacity: '0.5',
    textAlign: 'center',

    imgStyle: {
      width: '100px',
      height: '100px',
      marginTop: '50px'
    }
  }
  render () {
    const { imgStyle } = this.props

    return (
      <div className='loading-indicator-container' style={this.props}>
        <img src={LOADING_INDICATOR_IMAGE_PATH} style={imgStyle}/>
      </div>
    )
  }
}