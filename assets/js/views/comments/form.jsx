import React, {Component} from 'react';

import urls from '../../utils/urlHelper';

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
      <form className="post-form" method="POST" action={urls.post.addComment(postId)}>
        <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />

        <div>
          <label></label>
          <input
            className=""
            type="text"
            name="author"
            maxLength="200"
            value={author}
            onChange={this.handleChangeAuthor}
            required
            />
        </div>

        <div>
          <label></label>
          <textarea
            className=""
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
