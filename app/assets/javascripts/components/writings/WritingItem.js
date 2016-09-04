import React, { Component } from 'react'
import { Link } from 'react-router'


export default class WritingItem extends Component {
  static defaultProps = {
    singleLine: false,
    className: ''
  }

  componentDidMount () {
    this.fetchOrDecodeWriting()
  }

  componentDidUpdate () {
    this.fetchOrDecodeWriting()
  }

  fetchOrDecodeWriting () {
    const { singleLine, writing, onLoadWriting, id } = this.props

    if(!writing || !writing.id) {
      onLoadWriting(id)

    } else {
      if (!singleLine) {
        var sourceElement = document.querySelector(`#writing-item-${writing.id} .writing-item__original-content`);
        var targetElement = document.querySelector(`#writing-item-${writing.id} .writing-item__decoded-content`);
        hmd.run(sourceElement, targetElement);
      }
    }
  }

  getCssModifier () {
    return this.props.singleLine ? '_single-line' : ''
  }

  getFormattedDate (dateString) {
    var d = new Date(dateString)

    var year    = d.getFullYear()
    var month   = (d.getMonth() + 1)
    var date    = d.getDate()
    var hours   = d.getHours()
    var minutes = d.getMinutes()

    if (month   < 10) month   = '0' + month
    if (date    < 10) date    = '0' + date
    if (hours   < 10) hours   = '0' + hours
    if (minutes < 10) minutes = '0' + minutes

    return year+'.'+month+'.'+date+' '+hours+':'+minutes
  }

  render () {
    const { writing, singleLine, authenticityToken, className } = this.props;

    if(!writing || !writing.id) {
      return (
        <div></div>
      )
    }

    return (
      <div className={`writing-item${this.getCssModifier()} ${className}`}
           id={`writing-item-${writing.id}`}>

        {this.renderCategoryName()}

        <div className='writing-item__title'>
          <Link to={`/${writing.id}`}>{writing.title}</Link>
        </div>

        {/* 시간을 표시하는 엘리먼트를 getFormattedDate 메서드와 묶어서 하나의 컴포넌트로 만들자 */}
        <div className='writing-item__created-at'>
          {this.getFormattedDate(writing.created_at)}
        </div>

        {!singleLine && (
          <div className='writing-item__updated-at'>
            {this.getFormattedDate(writing.updated_at)}
          </div>
        )}

        {!singleLine && (
          <div className='writing-item__buttons-container'>
            <Link to={`/writings/${writing.id}/edit`} className='button-container__edit-button'>
              Edit
            </Link>

            <a>
              Delete
            </a>

            {/*<OneButtonForm formClassName='button-container__delete-form'
                           buttonClassName='delete-form__button'
                           authenticityToken={authenticityToken}
                           action={`/writings/${writing.id}`}
                           method='delete'
                           label='Delete' />*/}
          </div>
        )}

        {!singleLine && (
          <div className='writing-item__content'>
            <div className='writing-item__decoded-content'></div>
            <textarea className='writing-item__original-content' defaultValue={writing.content} />              
          </div>
        )}
      </div>
    )
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
        {(() => {
          if (writing.parent_category_id && writing.parent_category_id != rootCategoryId) {
            <Link to={this.getCategoryLink(writing.parent_category_id)}>
              {writing.parent_category_name}
            </Link>
          }
        })()}
        {(() => {
          if (writing.parent_category_id && writing.parent_category_id != rootCategoryId) {
            '/'
          }
        })()}

        <Link to={this.getCategoryLink(writing.category_id)}>
          {writing.category_name}
        </Link>
      </div>
    )
  }
}
