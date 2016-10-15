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
    textAlign: 'center'
  }
  render () {
    /*
      Warning!     
      `img` was passed a style object that has previously been mutated.
      Mutating `style` is deprecated.
      Consider cloning it beforehand.
      Check the `render` of `LoadingIndicator`."
    */
    // const imgStyleClone = imgStyle

    return (
      <div className='loading-indicator-container' style={this.props}>
        <i className='fa fa-circle-o-notch fa-spin fa-5x fa-fw'></i>
      </div>
    )
  }
}