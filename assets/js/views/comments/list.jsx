import React, {Component} from 'react';

import DateAndTime from '../../components/DateAndTime';
import urls from '../../utils/urlHelper';

import 'css/weblog/comments/list.css';

export default class CommmentList extends Component {
  render() {
    const {
      comments,
      isAuthenticated,
    } = this.props;

    return (
      <div>
        {comments.map(c =>
          (isAuthenticated === 'true' || c.approved === 'true') &&
            <div key={`comment-${c.pk}`} className='comment-detail'>
              {isAuthenticated === 'true' &&
                <div>
                  {c.approved !== 'true' &&
                    <a href={urls.comment.approve(c.pk)}>승인</a>
                  }
                  <a href={urls.comment.remove(c.pk)}>삭제</a>
                </div>
              }
              <div className="comment-author">{c.author}</div>
              <DateAndTime datetimeString={c.created_date} />
              <div>{c.text}</div>
            </div>
        )}
      </div>
    );
  }
}
