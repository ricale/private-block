import React, { Component } from 'react'
import Helmet from 'react-helmet'

export default class MyHelmet extends Component {
  render () {
    const { writing, title } = this.props

    const helmetTitle = writing ? writing.title : title
    const url = window.location.href

    return (
      <Helmet title={helmetTitle}
              titleTemplate='%s :: weblog ricale st.'
              defaultTitle='weblog ricale st.'
              meta={[
                {"name": "og:title", "content": helmetTitle},
                {"name": "og:url",   "content": url},
              ]} />
    )
  }
}