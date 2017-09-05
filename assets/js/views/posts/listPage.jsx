import React, {Component} from 'react';

import PostList from './list';
import CategoryList from '../categories/list';

import 'css/weblog/posts/listPage.css'

export default class PostListPage extends Component {
  render() {
    const {categories} = this.props;
    return (
      <div className='post-list-page'>
        <PostList {...this.props} />

        <CategoryList
          categories={categories}
          />
      </div>
    );
  }
}
