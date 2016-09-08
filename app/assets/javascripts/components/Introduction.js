import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Introduction extends Component {
  render () {
    return (
      <div className='container'>
        <div className='col-md-offset-1 col-md-10'>
          <h3>관련 링크</h3>
          <ul>
            <li><a href='mailto:kim.kangseong@gmail.com'>email</a></li>
            <li><a href='https://github.com/ricale/private-block' target='_blank'>Github</a></li>
            <li><a href='https://www.pivotaltracker.com/n/projects/1777827'>Pivotal Tracker</a></li>
          </ul>
        </div>
      </div>
    )
  }
}
