import React, {Component} from 'react';
import lemonJuice from 'lemon-juice';

const PREVIEW_NONE = 0;
const PREVIEW_HALF = 1;
const PREVIEW_FULL = 2;

export default class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: PREVIEW_HALF,
      title: props.title || '',
      text:  props.text  || ''
    };

    this.handlePressNoPreview = this.handlePressNoPreview.bind(this);
    this.handlePressHalfPreview = this.handlePressHalfPreview.bind(this);
    this.handlePressFullPreview = this.handlePressFullPreview.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
  }

  handlePressNoPreview(e) {
    this.setState({preview: PREVIEW_NONE});
  }

  handlePressHalfPreview(e) {
    this.setState({preview: PREVIEW_HALF});
  }

  handlePressFullPreview(e) {
    this.setState({preview: PREVIEW_FULL});
  }


  handleChangeTitle(e) {
    this.setState({title: e.target.value});
  }

  handleChangeText(e) {
    this.setState({text: e.target.value});
  }

  render() {
    const {csrfToken} = this.props;

    const {
      preview,
      title,
      text
    } = this.state;

    const formStyle = {};
    const previewStyle = {};
    switch(preview) {
      case PREVIEW_NONE:
        formStyle.display = 'block';
        break;

      case PREVIEW_HALF:
        formStyle.display = 'inline-block';
        formStyle.width   = '49%';
        previewStyle.display = 'inline-block';
        previewStyle.width   = '49%';
        break;

      case PREVIEW_FULL:
        formStyle.display = 'none';
        previewStyle.display = 'block';
        break;
    }

    return (
      <div>
        <form className="post-form" method="POST" action="" style={formStyle}>
          <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
          <div className="post-form__item">
            <label className="post-form__label">제목</label>
            <input
              className="post-form__input"
              type="text"
              name="title"
              maxLength="200"
              value={title}
              onChange={this.handleChangeTitle}
              required
              />
          </div>

          <div className="post-form__item">
            <label className="post-form__label">내용</label>
            <textarea
              className="post-form__textarea"
              name="text"
              value={text}
              onChange={this.handleChangeText}
              required>
            </textarea>
          </div>
          <button type="submit" className="btn btn-primary">저장</button>
        </form>

        {preview !== PREVIEW_NONE &&
          <div className="post-preview-container" style={previewStyle}>
            <label className="post-form__label">미리보기</label>
            <div className="post-preview" dangerouslySetInnerHTML={{__html: lemonJuice.decode(text)}}>
            </div>
          </div>
        }

        <div>
          <span>미리보기 상태: </span>
          <input type="radio" checked={preview === PREVIEW_NONE} onChange={this.handlePressNoPreview} /><label>없음</label>{" "}
          <input type="radio" checked={preview === PREVIEW_HALF} onChange={this.handlePressHalfPreview} /><label>반절</label>{" "}
          <input type="radio" checked={preview === PREVIEW_FULL} onChange={this.handlePressFullPreview} /><label>전체</label>
        </div>
      </div>
    );
  }
}
