import React, {Component} from 'react';

import PostList from './list';
import CategoryList from '../categories/list';
import urls from '../../utils/urlHelper';

export default class PostDraftList extends Component {
  render() {
    const {posts, categories} = this.props;
    return (
      <div>
        <PostList
          posts={posts}
          categories={categories}
          datetimeFieldName='created_date'
          categoryNameLinkUrlFunc={urls.category.draft}
          />

        <CategoryList
          categories={Object.keys(categories).map(k => categories[k])}
          postListUrlFunc={urls.category.draft}
          />
      </div>
    );
  }
}
