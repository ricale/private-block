import React, {Component} from 'react';

import LemonJuiceEditor from '../../components/LemonJuiceEditor';

import 'css/weblog/posts/form.css';

const PREVIEW_NONE = 0;
const PREVIEW_HALF = 1;
const PREVIEW_FULL = 2;

export default class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: PREVIEW_HALF,
      title:      (props.post || {}).title || '',
      categoryId: (props.post || {}).category_id || '',
      text:       (props.post || {}).text  || ''
    };

    this.handlePressNoPreview = this.handlePressNoPreview.bind(this);
    this.handlePressHalfPreview = this.handlePressHalfPreview.bind(this);
    this.handlePressFullPreview = this.handlePressFullPreview.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
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

  handleChangeCategory(e) {
    this.setState({categoryId: parseInt(e.target.value, 10)});
  }

  handleChangeText(e) {
    this.setState({text: e.target.value});
  }

  render() {
    const {
      csrfToken,
      categories
    } = this.props;

    const {
      preview,
      title,
      categoryId,
      text
    } = this.state;

    return (
      <div>
        <form className="post-form" method="POST" action="">
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
            <label className="post-form__label">분류</label>
            <select name="category" value={categoryId} onChange={this.handleChangeCategory}>
              {categories.map(c =>
                <option key={c.pk} value={c.pk}>{c.name}</option>
              )}
            </select>
          </div>

          <div className="post-form__item">
            <label className="post-form__label">내용</label>
            <LemonJuiceEditor
              name="text"
              value={text}
              onChange={this.handleChangeText}
              hideTextarea={preview === PREVIEW_FULL}
              hidePreview={preview === PREVIEW_NONE}
              required
              />

          </div>
          <button type="submit" className="btn btn-primary">저장</button>
        </form>

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
