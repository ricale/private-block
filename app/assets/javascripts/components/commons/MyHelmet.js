import React, { Component } from 'react'
import Helmet from 'react-helmet'

export default class MyHelmet extends Component {
  render () {
    const { writing, initialPath } = this.props

    let title = this.props.title
    let type = 'website'
    let description = 'Written by ricale'

    if(writing) {
      title = writing.title
      type = 'article'

      // const DESCRIPTION_MAX_LENGTH = 66
      // const firstLineBreakIndex  = writingContent.indexOf("\n")
      // const firstWhiteSpaceIndex = writingContent.indexOf(" ", DESCRIPTION_MAX_LENGTH)

      // let descriptionLength = DESCRIPTION_MAX_LENGTH

      // if(firstLineBreakIndex !== -1) {
      //   if(firstLineBreakIndex < DESCRIPTION_MAX_LENGTH) {
      //     descriptionLength = firstLineBreakIndex

      //   } else if(firstWhiteSpaceIndex !== -1) {
      //     descriptionLength = firstWhiteSpaceIndex < firstLineBreakIndex ? firstWhiteSpaceIndex : firstLineBreakIndex
      //   }
      // }

      // description = writing.content.slice(0, descriptionLength)
    }

    let url

    if(window && window.location) {
      url = window.location.href
    } else {
      url = initialPath
    }

    return (
      <Helmet title={title}
              titleTemplate='%s :: weblog ricale st.'
              defaultTitle='weblog ricale st.'
              meta={[
                {"property": "og:title",       "content": title},
                {"property": "og:url",         "content": url},
                {"property": "og:type",        "content": type},
                {"property": "og:description", "content": description},
              ]} />
    )
  }
}