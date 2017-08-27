import React, {Component} from 'react';

import DateAndTime from '../../components/DateAndTime';
import urls from '../../utils/urlHelper';

export default class PostList extends Component {
  static defaultProps = {
    datetimeFieldName: 'published_date'
  };

  render() {
    const {posts, categories, datetimeFieldName} = this.props;

    return (
      <div>
        {posts.map(p =>
          <div key={`post-${p.pk}`} className='post'>
            <h2>
              <a href={urls.post.detail(p.pk)}>{p.title}</a>
              <small> ({p.comments.filter(c => c.approved === 'true').length})</small>
            </h2>
            <div>{categories[p.category_id].name}</div>
            <DateAndTime datetimeString={p[datetimeFieldName]}/>
          </div>
        )}
      </div>
    );
  }
}
