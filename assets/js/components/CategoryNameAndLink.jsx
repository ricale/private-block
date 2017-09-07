import React, {Component} from 'react';

import urls from '../utils/urlHelper';

export default class CategoryNameAndLink extends Component {
  static defaultProps = {
    urlFunc: urls.category.post
  };

  getCategory() {
    const {
      categoryHash,
      categoryId,
      category,
    } = this.props;

    return category || categoryHash[categoryId];
  }

  getParentCategory() {
    const {
      categoryHash,
      parent
    } = this.props;

    if(parent) {
      return parent;
    }

    if(!categoryHash) {
      return undefined;
    }

    const category = this.getCategory();

    if([0,1,'0','1'].indexOf(category.parent_id) !== -1) {
      return undefined;
    }

    return categoryHash[category.parent_id];
  }

  render() {
    const {
      urlFunc
    } = this.props;

    const category = this.getCategory();
    const parent = this.getParentCategory();

    return (
      <span>
        {parent &&
          <a href={urlFunc(parent.pk)}>{parent.name}</a>
        }
        {parent && "/"}
        <a href={urlFunc(category.pk)}>{category.name}</a>
      </span>
    );
  }
}
