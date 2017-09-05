import React, {Component} from 'react';

import PostList from './list';
import CategoryList from '../categories/list';
import urls from '../../utils/urlHelper';

import 'css/weblog/posts/draftListPage.css'

export default class PostDraftList extends Component {
  render() {
    const {categories} = this.props;
    return (
      <div className='draft-list-page'>
        <PostList
          {...this.props}
          datetimeFieldName='created_date'
          categoryNameLinkUrlFunc={urls.category.draft}
          paginationUrlFunc={urls.post.draftWithPage}
          />

        <CategoryList
          categories={categories}
          postListUrlFunc={urls.category.draft}
          />
      </div>
    );
  }
}
