import React, {Component} from 'react';

export default class Pagination extends Component {
  render() {
    const {pageCount, urlFunc} = this.props;

    const current = parseInt(this.props.current || 0, 10);

    return (
      <div>
        {[...new Array(pageCount)].map((a,i) =>
          <span key={`pagination-${i}`} className={`page ${current === i + 1 ? 'page-current' : ''}`}>
            {current === i + 1 && i + 1}

            {current !== i + 1 &&
              <a href={urlFunc(i+1)}>{i+1}</a>
            }
          </span>
        )}
      </div>
    );
  }
}
