import React, {Component} from 'react';
import lemonJuice from 'lemon-juice';

export default class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title || '',
      text:  props.text  || ''
    };

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
  }

  handleChangeTitle(e) {
    this.setState({title: e.target.value});
  }

  handleChangeText(e) {
    this.setState({text: e.target.value});
  }

  render() {
    const {csrf_token: csrfToken} = this.props;
    const {
      title,
      text
    } = this.state;

    return (
      <div>
        <form className="post-form" method="POST" action="">
          <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
          <div className="post-form__item">
            <label className="post-form__label">Title</label>
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
            <label className="post-form__label">Content</label>
            <textarea
              className="post-form__textarea"
              name="text"
              maxLength="200"
              value={text}
              onChange={this.handleChangeText}
              required>
            </textarea>
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
        <div className="post-preview" dangerouslySetInnerHTML={{__html: lemonJuice.decode(text)}}>
        </div>
      </div>
    );
  }
}
