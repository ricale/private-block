import React, {Component} from 'react';

import PostList from './list';

export default class PostDraftList extends Component {
  render() {
    const {posts, categories} = this.props;
    return (
      <PostList
        posts={posts}
        categories={categories}
        datetimeFieldName='created_date'
        />
    );
  }
}
