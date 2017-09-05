import React, {Component} from 'react';

import CategoryList from '../categories/list';
import DateAndTime from '../../components/DateAndTime';
import Pagination from '../../components/Pagination';
import urls from '../../utils/urlHelper';

import 'css/weblog/posts/list.css';

export default class PostList extends Component {
  static defaultProps = {
    datetimeFieldName: 'published_date',
    categoryNameLinkUrlFunc: urls.category.post,
    paginationUrlFunc: urls.post.listWithPage
  };

  render() {
    const {
      posts,
      postCount,
      page,
      perPage,
      categories,
      datetimeFieldName,
      categoryNameLinkUrlFunc: urlFunc,
      paginationUrlFunc
    } = this.props;

    const categoryHash = {}
    categories.forEach(c =>
      categoryHash[c.pk] = c
    );

    return (
      <div>
        {posts.map(p =>
          <div key={`post-${p.pk}`} className='post'>
            <h2>
              <a href={urls.post.detail(p.pk)}>{p.title}</a>
              <small> ({p.comments.filter(c => c.approved === 'true').length})</small>
            </h2>
            <div><a href={urlFunc(p.category_id)}>{categoryHash[p.category_id].name}</a></div>
            <DateAndTime datetimeString={p[datetimeFieldName]}/>
          </div>
        )}

        <Pagination
          current={page}
          perPage={perPage}
          pageCount={Math.ceil(postCount / perPage)}
          urlFunc={paginationUrlFunc}
          />
      </div>
    );
  }
}
