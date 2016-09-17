import React, { Component } from 'react'
import { Link } from 'react-router'

import DateAndTime from '../commons/DateAndTime'
import FacebookLikeButton from '../sns/FacebookLikeButton'
import FacebookComments from '../sns/FacebookComments'

import { initFacebookPlugin } from '../../initFacebookPlugin'


export default class WritingItem extends Component {
  static defaultProps = {
    singleLine: false,
    className: ''
  }

  state = {
    decodedContent: ''
  }

  componentWillMount () {
    const { onLoadWriting, writing, id } = this.props
    if((!writing || !writing.id) && id) {
      onLoadWriting(id)
    } else {
      this.setDecodedContent(this.props)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { onLoadWriting, id } = this.props

    if(id && id !== nextProps.id) {
      onLoadWriting(id)
    } else {
      this.setDecodedContent(nextProps)
    }
  }

  componentDidMount () {
    const { id, writing } = this.props

    if(writing && writing.id === id) {
      this.showFacebookPlugin()
    }
  }

  componentDidUpdate (prevProps) {
    const { id, writing } = this.props

    if(writing && writing.id === id) {
      this.showFacebookPlugin()
    }
  }

  setDecodedContent (props) {
    const { singleLine, writing } = props

    if(!singleLine && writing && writing.content) {
      const element = document.createElement("div")
      element.innerHTML = writing.content
      this.setState({decodedContent: hmd.decode(element.innerText)})
    }
  }

  showFacebookPlugin () {
    initFacebookPlugin(this.getPath())
  }

  getPath () {
    const { id, writing } = this.props
    return `/${id || writing.id}`
  }

  getCssModifier () {
    return this.props.singleLine ? '_single-line' : ''
  }

  getCategoryLink (id) {
    return `/categories/${id}/writings`
  }

  renderCategoryName () {
    const { writing } = this.props
    {/* 상수를 박아놓을 것이 아니라, parentCategoryTypeId 따위가 필요 */}
    const rootCategoryId = 1

    return (
      <div className='writing-item__category'>
        <span className='writing-item__parent-category'>
          {(writing.parent_category_id && writing.parent_category_id != rootCategoryId) && (
            <Link to={this.getCategoryLink(writing.parent_category_id)}>
              {writing.parent_category_name}
            </Link>
          )}

          {(writing.parent_category_id && writing.parent_category_id != rootCategoryId) && (
            '/'
          )}
        </span>

        <span className='writing-item__current-category'>
          <Link to={this.getCategoryLink(writing.category_id)}>
            {writing.category_name}
          </Link>
        </span>
      </div>
    )
  }

  onClickDeleteButton (event) {
    event.preventDefault()
    const { onDeleteWriting, writing } = this.props
    onDeleteWriting(writing.id)
  }

  render () {
    const { writing, singleLine, className, loggedInNow } = this.props;

    if(!writing || !writing.id) {
      return (
        <div></div>
      )
    }

    return (
      <div className={`writing-item${this.getCssModifier()} ${className}`}
           id={`writing-item-${writing.id}`}>

        <div className='writing-item__header'>
          {this.renderCategoryName()}

          <div className='writing-item__title'>
            <Link to={this.getPath()}>{writing.title}</Link>
          </div>

          <DateAndTime className='writing-item__created-at' datetimeString={writing.created_at} />

          {!singleLine && 
            <DateAndTime className='writing-item__updated-at' datetimeString={writing.updated_at} withParentheses={true} />
          }

          {!singleLine && loggedInNow && (
            <div className='writing-item__buttons-container'>
              <Link to={`/writings/${writing.id}/edit`} className='button-container__edit-button'>
                Edit
              </Link>

              {' '}

              <a className='button_container__delete-button'
                 href='#'
                 onClick={this.onClickDeleteButton.bind(this)}>
                Delete
              </a>
            </div>
          )}
        </div>

        {!singleLine && (
          <div className='writing-item__content'>
            <div className='writing-item__decoded-content' dangerouslySetInnerHTML={{__html: this.state.decodedContent}}></div>
            {/*<textarea className='writing-item__original-content' defaultValue={writing.content} />*/}
          </div>
        )}

        {!singleLine &&
          <div className='writing-item__sns-plugin'>
            <FacebookLikeButton href={`http://weblog.ricaest.net/${writing.id}`} />
            <FacebookComments href={`http://weblog.ricaest.net/${writing.id}`} />
          </div>
        }
      </div>
    )
  }
}
