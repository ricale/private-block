import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import Measure from 'react-measure'

import DateAndTime from '../commons/DateAndTime'
import Hme from '../commons/Hme'
import LoadingIndicator from '../commons/LoadingIndicator'
import FacebookLikeButton from '../sns/FacebookLikeButton'
import FacebookComments from '../sns/FacebookComments'

import { initFacebookPlugin } from '../../initFacebookPlugin'

import { DUMMY_PARAGRAPHS } from '../../constants/commons'


export default class WritingItem extends Component {
  static defaultProps = {
    singleLine: false,
    className: '',
    writing: {
      title: 'Now loading',
      // category_id: 
      category_name: 'Hello'
    }
  }

  state = {
    decodedContent: '',
    dimensions: {}
  }

  componentWillMount () {
    const { fetchWriting, id } = this.props

    if(id) {
      fetchWriting(id)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { fetchWriting, writing, id } = this.props

    if(nextProps.id === id && !nextProps.writing && writing) {
      browserHistory.push('/writings')
    }

    if(nextProps.id !== id) {
      fetchWriting(nextProps.id)
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

  showFacebookPlugin () {
    initFacebookPlugin(this.getPath())
  }

  // for render() and renderCategoryName()
  getWriting () {
    let writing = this.props.writing
    if(!writing || !writing.id) {
      writing = WritingItem.defaultProps.writing
    }

    return writing
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
    const writing = this.getWriting()
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
    const { deleteWriting, writing, authenticityToken } = this.props

    deleteWriting(writing.id, authenticityToken)
  }

  render () {
    const { singleLine, className, loggedInNow } = this.props;

    const writing = this.getWriting()

    return (
      <Measure whitelist={['height']}>
      {dimensions =>

      <div className={`writing-item${this.getCssModifier()} ${className}`}
           id={`writing-item-${writing.id}`}>

        {(!writing || !writing.id) &&
          <LoadingIndicator height={`${dimensions.height}px`}/>
        }

        <div className='writing-item__header'>
          <div className='writing-item__title'>
            <Link to={this.getPath()}>{writing.title}</Link>
          </div>

          {this.renderCategoryName()}

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

        {!singleLine &&
          <Hme previewClassName='writing-item__content' value={(writing && writing.content) || DUMMY_PARAGRAPHS} hideTextarea={true} />
        }

        {!singleLine &&
          <div className='writing-item__sns-plugin'>
            <FacebookLikeButton href={`http://weblog.ricaest.net/${writing.id}`} />
            <FacebookComments href={`http://weblog.ricaest.net/${writing.id}`} />
          </div>
        }
      </div>

      }
      </Measure>
    )
  }
}
