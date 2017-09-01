import React, {Component} from 'react';

import urls from '../../utils/urlHelper';

export default class CategoryList extends Component {
  static defaultProps = {
    postListUrlFunc: urls.category.post
  };

  render() {
    const {categories, postListUrlFunc} = this.props;
    return (
      <div>
        {categories.map(c =>
          <div key={`c-${c.pk}`} className={`depth-${c.depth}`}>
            <a href={postListUrlFunc(c.pk)}>{c.name}</a>
          </div>
        )}
      </div>
    )
  }
}
