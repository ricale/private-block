import React, { Component } from 'react'
import Helmet from 'react-helmet'

export default class MyHelmet extends Component {
  render () {
    const { writing, title, imageUrl } = this.props

    const helmetTitle = writing ? writing.title : title
    const type = 'article'
    const url = window.location.href

    return (
      <Helmet title={helmetTitle}
              titleTemplate='%s :: weblog ricale st.'
              defaultTitle='weblog ricale st.'
              meta={[
                {"name": "og:title", "content": title},
                {"name": "og:type",  "content": type},
                {"name": "og:url",   "content": url},
                {"name": "og:image", "content": imageUrl}
              ]} />
    )
  }
}