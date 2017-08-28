import React, {Component} from 'react';

import PostList from './list';
import CategoryList from '../categories/list';

export default class PostListPage extends Component {
  render() {
    const {posts, categories} = this.props;
    return (
      <div>
        <PostList
          posts={posts}
          categories={categories}
          />

        <CategoryList
          categories={Object.keys(categories).map(k => categories[k])}
          />
      </div>
    );
  }
}
