import React, {Component} from 'react';

import PostList from '../posts/list';
import CategoryList from './list';

import urls from '../../utils/urlHelper';

import 'css/weblog/posts/listPage.css'

export default class CategoryPostListPage extends Component {
  render() {
    const {categories, categoryId} = this.props;
    return (
      <div className='post-list-page'>
        <PostList
          {...this.props}
          paginationUrlFunc={(i) => urls.category.postWithPage(categoryId, i)}
          />

        <CategoryList
          categories={categories}
          />
      </div>
    );
  }
}
