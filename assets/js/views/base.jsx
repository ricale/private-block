import React, {Component} from 'react';

import urls from '../utils/urlHelper';

import 'css/weblog/base.css';

export default class Base extends Component {
  render() {
    const {
      children,
      isAuthenticated
    } = this.props;

    return (
      <div className="container-fluid">
        <div className="weblog-header">
          <h1><a href="/">weblog ricale st.</a></h1>
          <div className="weblog-header__menu">
            {isAuthenticated &&
              <span>
                <a href={urls.post.new()}>새 글</a>
                <a href={urls.post.draft()}>비공개글 목록</a>
                <a href={urls.session.logout()}>로그아웃</a>
              </span>
            }
            {!isAuthenticated &&
              <a href={urls.session.login()} className="weblog-header__login">로그인</a>
            }
          </div>
        </div>

        <div className="weblog-content">
          <div className="row">
            <div className="col-md-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
