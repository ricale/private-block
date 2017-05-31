import React, {Component} from 'react';

export default class Form extends Component {
  render () {
    const {token, children} = this.props;
    const method = this.props.method.toLowerCase();
    const formMethod = method === 'get' ? method : 'post';

    return (
      <form {...this.props} method={formMethod}>
        <input type="hidden" name="authenticity_token" value={token}/>
        {method !== 'get' && method !== 'post' &&
          <input type="hidden" name="_method" value={method}/>
        }
        {children}
      </form>
    )
  }
}
