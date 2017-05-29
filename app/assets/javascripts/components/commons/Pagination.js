import React, { Component } from 'react'

export default class Pagination extends Component {
  static defaultProps = {
    total: 1,
    windowCount: 4
  }

  componentWillMount () {
    this.setUrlWithQuery(this.props)
    this.setCurrentPage(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.setUrlWithQuery(nextProps)
    this.setCurrentPage(nextProps)
  }

  setUrlWithQuery (props) {
    const { pathname, query } = props

    let queryStrings = []

    for(let key in query) {
      if(query.hasOwnProperty(key) && key != 'page') {
        queryStrings.push(`${key}=${query[key]}`)
      }
    }

    let uriWithQuery = `${props.pathname}?`

    if(queryStrings.length > 0) {
      uriWithQuery = `${uriWithQuery}${queryStrings.join("&")}`
    }

    this.setState({
      uriWithQuery
    })
  }

  setCurrentPage (props) {
    const { current } = props

    // FIXME: why use state
    this.setState({
      current: (parseInt(current, 10) || 1)
    })
  }

  getUrl (page) {
    return `${this.state.uriWithQuery}page=${page}`
  }


  renderFirstPage () {
    const { windowCount } = this.props
    const { uriWithQuery, current } = this.state

    if(current - windowCount > 1) {
      return (
        <span className='pagination__first'>
          <a link={this.getUrl(1)} className='pagination__first-link'>1</a>
        </span>
      )
    }
  }

  renderCurrentAndWindow () {
    const { total, windowCount } = this.props
    const { uriWithQuery, current } = this.state

    let first = current - windowCount
    if(first < 1) {
      first = 1
    }

    let last = current + windowCount
    if(last > total) {
      last = total
    }

    let links = []
    for(let i = first; i <= last; i += 1) {
      let className = i === current ? 'current' : 'page'
      links.push(
        <span className={`pagination__${className}`} key={`page-${i}`}>
          <a href={this.getUrl(i)} className={`pagination__${className}-link`}>
            {i}
          </a>
        </span>
      )
    }

    return links
  }

  renderLastPage () {
    const { windowCount, total } = this.props
    const { uriWithQuery, current } = this.state

    if(current + windowCount < total) {
      return (
        <span className='pagination__last'>
          <a href={this.getUrl(total)} className='pagination__last-link'>{total}</a>
        </span>
      )
    }
  }

  renderFrontGap () {
    const { windowCount } = this.props
    if(this.state.current - windowCount > 2) {
      return <span className='pagination__gap'>...</span>
    }
  }

  renderBehindGap () {
    const { windowCount, total } = this.props
    if(this.state.current + windowCount < total - 1) {
      return <span className='pagination__gap'>...</span>
    }
  }

  render () {
    const { classModName } = this.props

    let classModifier = classModName ? `_${classModName}` : ''
    let className = `pagination${classModifier}`

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
