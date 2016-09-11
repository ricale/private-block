import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Pagination extends Component {
  static defaultProps = {
    current: 1,
    total:   1,

    windowCount: 4
  }

  componentWillMount () {
    this.setUrlWithQuery(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.setUrlWithQuery(nextProps)
  }

  setUrlWithQuery (props) {
    const { pathname, query } = props

    var queryStrings = []

    for(var key in query) {
      if(query.hasOwnProperty(key) && key != 'page') {
        queryStrings.push(`${key}=${query[key]}`)
      }
    }

    var uriWithQuery = `${props.pathname}?`

    if(queryStrings.length > 0) {
      uriWithQuery = `${uriWithQuery}${queryStrings.join("&")}`
    }

    this.setState({
      uriWithQuery
    })
  }

  getUrl (page) {
    return `${this.state.uriWithQuery}page=${page}`
  }


  renderFirstPage () {
    const { current, windowCount } = this.props
    const { uriWithQuery } = this.state

    if(current - windowCount > 1) {
      return (
        <span className='pagination__first'>
          <Link to={this.getUrl(1)} className='pagination__first-link'>1</Link>
        </span>
      )
    }
  }

  renderCurrentAndWindow () {
    const { current, total, windowCount } = this.props
    const { uriWithQuery } = this.state

    var first = current - windowCount
    if(first < 1) {
      first = 1
    }

    var last = current + windowCount
    if(last > total) {
      last = total
    }

    var links = []
    for(var i = first; i <= last; i += 1) {
      var className = i === current ? 'current' : 'page'
      links.push(
        <span className={`pagination__${className}`} key={`page-${i}`}>
          <Link to={this.getUrl(i)} className={`pagination__${className}-link`}>
            {i}
          </Link>
        </span>
      )
    }

    return links
  }

  renderLastPage () {
    const { current, windowCount, total } = this.props
    const { uriWithQuery } = this.state

    if(current + windowCount < total) {
      return (
        <span className='pagination__last'>
          <Link to={this.getUrl(total)} className='pagination__last-link'>{total}</Link>
        </span>
      )
    }
  }

  renderFrontGap () {
    const { current, windowCount } = this.props
    if(current - windowCount > 2) {
      return <span className='pagination__gap'>...</span>
    }
  }

  renderBehindGap () {
    const { current, windowCount, total } = this.props
    if(current + windowCount < total - 1) {
      return <span className='pagination__gap'>...</span>
    }
  }

  render () {
    const { classModName } = this.props

    var classModifier = classModName ? `_${classModName}` : ''
    var className = `pagination${classModifier}`

    return (
      <nav className={className}>
        {this.renderFirstPage()}

        {this.renderFrontGap()}

        {this.renderCurrentAndWindow()}

        {this.renderBehindGap()}

        {this.renderLastPage()}
      </nav>
    )
  }
}