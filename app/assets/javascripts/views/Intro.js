import React, { Component } from 'react';

import App from '../components/containers/App';

export default class Intro extends Component {
  render () {
    const githubUrl = 'https://github.com/ricale/private-block'
    const trackerUrl = 'https://www.pivotaltracker.com/n/projects/1777827'

    return (
      <App {...this.props}>
        <div className='introduction'>
          <h3>Introduction</h3>
          <ul>
            <li>개인 블로그. 직접 구현 및 관리 중.</li>
            <li>이 블로그의 Github 코드 저장소: <a href={githubUrl} target='_blank'>{githubUrl}</a></li>
            <li>이 블로그 구현의 Pivotal Tracker: <a href={trackerUrl} target='_blank'>{trackerUrl}</a></li>
          </ul>
        </div>
      </App>
    )
  }
}