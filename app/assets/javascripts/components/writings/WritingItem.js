import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import Form from '../commons/Form'
import DateAndTime from '../commons/DateAndTime'
import Hme from '../commons/Hme'
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
  };

  constructor (props) {
    super(props);
    this.state = {
      decodedContent: '',
      dimensions: {}
    };
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

  getPath () {
    const { id, writing } = this.props
    return `/${id || writing.id}`
  }

  getModifiedClassName () {
    const className = 'writing-item'

    let classNameWithModifier = ''

    if(this.props.singleLine) {
      classNameWithModifier += ` ${className}_single-line`
    }

    return classNameWithModifier
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
            <a href={this.getCategoryLink(writing.parent_category_id)}>
              {writing.parent_category_name}
            </a>
          )}

          {(writing.parent_category_id && writing.parent_category_id != rootCategoryId) && (
            '/'
          )}
        </span>

        <span className='writing-item__current-category'>
          <a href={this.getCategoryLink(writing.category_id)}>
            {writing.category_name}
          </a>
        </span>
      </div>
    )
  }

  render () {
    const {writing, singleLine, className, loggedInNow, authenticityToken} = this.props

    return (
      <div className={`writing-item${this.getModifiedClassName()} ${className}`}
           id={`writing-item-${writing.id}`}>

        <div className='writing-item__header'>
          <div className='writing-item__title'>
            <a href={this.getPath()}>{writing.title}</a>
          </div>

          {this.renderCategoryName()}

          <DateAndTime className='writing-item__created-at' datetimeString={writing.created_at} />

          {!singleLine && 
            <DateAndTime className='writing-item__updated-at' datetimeString={writing.updated_at} withParentheses={true} />
          }

          {!singleLine && loggedInNow && (
            <div className='writing-item__buttons-container'>
              <a href={`/writings/${writing.id}/edit`} className='button-container__edit-button'>
                Edit
              </a>

              {' '}

              <Form
                action={`/writings/${writing.id}`}
                method="DELETE"
                style={{display: 'inline-block'}}
                token={authenticityToken}
              >
                <input type='submit' value='Delete' style={{border: 0, background: 'none'}} />
              </Form>
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
    )
  }
}
