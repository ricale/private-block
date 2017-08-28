import React, {Component} from 'react';

import CategoryList from '../categories/list';
import DateAndTime from '../../components/DateAndTime';
import urls from '../../utils/urlHelper';

export default class PostList extends Component {
  static defaultProps = {
    datetimeFieldName: 'published_date',
    categoryNameLinkUrlFunc: urls.category.post
  };

  render() {
    const {
      posts,
      categories,
      datetimeFieldName,
      categoryNameLinkUrlFunc: urlFunc
    } = this.props;

    return (
      <div>
        {posts.map(p =>
          <div key={`post-${p.pk}`} className='post'>
            <h2>
              <a href={urls.post.detail(p.pk)}>{p.title}</a>
              <small> ({p.comments.filter(c => c.approved === 'true').length})</small>
            </h2>
            <div><a href={urlFunc(p.category_id)}>{categories[p.category_id].name}</a></div>
            <DateAndTime datetimeString={p[datetimeFieldName]}/>
          </div>
        )}
      </div>
    );
  }
}
