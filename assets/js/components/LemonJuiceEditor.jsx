import React, {Component} from 'react';
import lemonJuice from 'lemon-juice';

import 'css/LemonJuiceEditor.css';

export default class LemonJuiceEditor extends Component {
  static defaultProps = {
    textareaClassName: 'lemon-juice__textarea',
    previewClassName: 'lemon-juice__preview',
    hideTextarea: false,
    hidePreview: false
  };

  componentWillMount() {
    this.setMarkdownedContent(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setMarkdownedContent(nextProps);
  }

  setMarkdownedContent(props) {
    const {value} = props;

    const textarea = document.createElement('textarea');
    textarea.value = value;
    this.setState({markdowned: lemonJuice.decode(textarea.value)});
  }

  getPreviewHTML() {
    return {__html: this.state.markdowned};
  }

  render() {
    const {
      onChange,
      value,
      name,
      required,
      className,
      textareaClassName,
      previewClassName,
      hideTextarea,
      hidePreview
    } = this.props;

    return (
      <div className='lemon-juice-container'>
        {!hideTextarea &&
          <textarea
            className={textareaClassName}
            name={name}
            value={value}
            onChange={onChange}
            required={required}>
          </textarea>
        }

        {!hidePreview &&
          <div
            className={previewClassName}
            dangerouslySetInnerHTML={this.getPreviewHTML()}>
          </div>
        }
      </div>
    );
  }
}
