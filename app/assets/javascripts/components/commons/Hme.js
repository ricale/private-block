import React, { Component } from 'react'

export default class Hme extends Component {
  componentWillMount () {
    this.setDecodedContent(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.setDecodedContent(nextProps)
  }

  setDecodedContent (props) {
    const { singleLine, value } = props

    if(!singleLine) {
      const textarea = document.createElement("textarea")
      textarea.value = value
      this.setState({decodedContent: hmd.decode(textarea.value)})
    }
  }

  getPreviewHTML () {
    return {__html: this.state.decodedContent}
  }

  getModifiedClassName () {
    const { hideTextarea, hidePreview } = this.props
    const className = 'hme'
    let classNameWithModifier = ''

    if(hideTextarea) {
      classNameWithModifier += ` ${className}_only-preview`

    } else if (hidePreview) {
      classNameWithModifier += ` ${className}_only-textarea`
    }

    return classNameWithModifier
  }

  render () {
    const { name, value, onChange, hideTextarea, hidePreview } = this.props

    const textareaClassName = `hme__textarea ${this.props.textareaClassName || ''}`
    const previewClassName  = `hme__preview ${this.props.previewClassName || ''}`

    return (
      <div className={`hme${this.getModifiedClassName()} ${this.props.className || ''}`}>
        {!hideTextarea &&
          <textarea className={textareaClassName} name={name} value={value} onChange={onChange} />
        }
        {!hidePreview &&
          <div className='hme__preview' dangerouslySetInnerHTML={this.getPreviewHTML()}></div>
        }
      </div>
    )
  }
}
