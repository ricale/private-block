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

  render () {
    const { name, value, onChange, hideTextarea, hidePreview } = this.props

    let className = 'hme'
    if(hideTextarea) {
      className = `${className}_only-preview`
    } else if (hidePreview) {
      className = `${className}_only-textarea`
    }
    className = `${className} ${this.props.className || ''}`

    const textareaClassName = `hme__textarea ${this.props.textareaClassName || ''}`
    const previewClassName  = `hme__preview ${this.props.previewClassName || ''}`

    return (
      <div className={className}>
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
