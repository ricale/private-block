import React, {Component} from 'react';

import urls from '../../utils/urlHelper';

import 'css/weblog/comments/form.css';

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: props.author || '',
      text:  props.text  || ''
    };

    this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
  }

  handleChangeAuthor(e) {
    this.setState({author: e.target.value});
  }

  handleChangeText(e) {
    this.setState({text: e.target.value});
  }

  render() {
    const {csrfToken, postId} = this.props;

    const {
      author,
      text
    } = this.state;

    return (
      <form className="comment-form" method="POST" action={urls.post.addComment(postId)}>
        <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />

        <div className='comment-form__row'>
          <label className='comment-form__label'>작성자</label>
          <input
            className='comment-form__author'
            type="text"
            name="author"
            maxLength="200"
            value={author}
            onChange={this.handleChangeAuthor}
            required
            />
        </div>

        <div className='comment-form__row'>
          <textarea
            className='comment-form__text'
            name="text"
            value={text}
            onChange={this.handleChangeText}
            required>
          </textarea>
        </div>

        <button type="submit" className="btn btn-primary">저장</button>
      </form>
    );
  }
}
