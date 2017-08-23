import React, {Component} from 'react';
import lemonJuice from 'lemon-juice';

export default class NewPost extends Component {
  render() {
    const {csrf_token: csrfToken} = this.props;
    return (
      <div>
        <form method="POST" action="">
          <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
          <input type="text" name="title" maxLength="200" required/>
          <textarea name="text" maxLength="200" required></textarea>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    );
  }
}
