import React, {Component} from 'react';

import PostList from './list';

export default class PostDraftList extends Component {
  render() {
    const {posts} = this.props;
    return (
      <PostList
        posts={posts}
        datetimeFieldName='created_date'
        />
    );
  }
}
