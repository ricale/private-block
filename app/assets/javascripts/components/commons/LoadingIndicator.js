import React, { Component } from 'react'
import { LOADING_INDICATOR_IMAGE_PATH } from '../../constants/commons'

export default class LoadingIndicator extends Component {
  static defaultProps = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    zIndex: 2,

    width: "100%",
    height: "400px",

    backgroundColor: "#FFF",
    opacity: '0.5',
    textAlign: 'center',

    imgStyle: {
      width: '100px',
      height: '100px'
    }
  }
  render () {
    const { imgStyle } = this.props

    const height      = parseInt(this.props.height.slice(0, -2), 10)
    const imageHeight = parseInt(imgStyle.height.slice(0, -2),   10)

    let imageMarginTop = height / 2 - imageHeight / 2
    if(imageMarginTop < 0) {
      imageMarginTop = 0
    }

    imgStyle.marginTop = `${imageMarginTop}px`

    /*
      Warning!     
      `img` was passed a style object that has previously been mutated.
      Mutating `style` is deprecated.
      Consider cloning it beforehand.
      Check the `render` of `LoadingIndicator`."
    */
    // const imgStyleClone = imgStyle

    const imgStyleClone = Object.assign({}, imgStyle)

    return (
      <div className='loading-indicator-container' style={this.props}>
        <img src={LOADING_INDICATOR_IMAGE_PATH} style={imgStyleClone}/>
      </div>
    )
  }
}