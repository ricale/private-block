import React, {Component} from 'react';

import urls from '../../utils/urlHelper';

export default class CategoryList extends Component {
  render() {
    const {categories} = this.props;
    return (
      <div>
        {categories.map(c =>
          <div key={`c-${c.pk}`} className={`depth-${c.depth}`}>
            <a href={urls.category.post(c.pk)}>{c.name}</a>
          </div>
        )}
      </div>
    )
  }
}
