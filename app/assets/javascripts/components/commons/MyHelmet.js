import React, { Component } from 'react'
import Helmet from 'react-helmet'

export default class MyHelmet extends Component {
  render () {
    const { writing } = this.props

    let title = this.props.title
    let type = 'website'
    let description = 'Written by ricale'

    // if(writing) {
    //   title = writing.title
    //   type = 'article'

    //   const DESCRIPTION_MAX_LENGTH = 66
    //   const firstLineBreakIndex  = writing.content.indexOf("\n")
    //   const firstWhiteSpaceIndex = writing.content.indexOf(" ", DESCRIPTION_MAX_LENGTH)

    //   let descriptionLength = DESCRIPTION_MAX_LENGTH

    //   if(firstLineBreakIndex !== -1) {
    //     if(firstLineBreakIndex < DESCRIPTION_MAX_LENGTH) {
    //       descriptionLength = firstLineBreakIndex

    //     } else if(firstWhiteSpaceIndex !== -1) {
    //       descriptionLength = firstWhiteSpaceIndex < firstLineBreakIndex ? firstWhiteSpaceIndex : firstLineBreakIndex
    //     }
    //   }

    //   description = writing.content.slice(0, descriptionLength)
    // }

    const url = window.location.href

    return (
      <Helmet htmlAttributes={{"prefix": "og: http://ogp.me/ns# article: http://ogp.me/ns/article#"}}
              title={title}
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