import React, {Component} from 'react';

import PostList from './list';
import CategoryList from '../categories/list';

export default class PostListPage extends Component {
  render() {
    const {categories} = this.props;
    return (
      <div>
        <PostList {...this.props} />

        <CategoryList
          categories={categories}
          />
      </div>
    );
  }
}
