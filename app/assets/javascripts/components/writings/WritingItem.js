import React, { Component } from 'react'

export default class WritingItem extends Component {
  componentDidMount () {
    const { singleLine, writing } = this.props;

    if (singleLine) {
      sourceElement = document.querySelector(`#writing-item-${writing.id} .writing-item__original-content`);
      targetElement = document.querySelector(`#writing-item-${writing.id} .writing-item__decoded-content`);
      hmd.run(sourceElement, targetElement);
    }
  }

  getDefaultProps () {
    return {
      singleLine: false,
    }
  }

  getCssModifier () {
    singleLine ? '_single-line' : ''
  }

  getFormattedDate (dateString) {
    d = new Date(dateString)

    year    = d.getFullYear()
    month   = (d.getMonth() + 1)
    date    = d.getDate()
    hours   = d.getHours()
    minutes = d.getMinutes()

    if (month   < 10) month   = '0' + month
    if (date    < 10) date    = '0' + date
    if (hours   < 10) hours   = '0' + hours
    if (minutes < 10) minutes = '0' + minutes

    return year+'.'+month+'.'+date+' '+hours+':'+minutes
  }

  render () {
    const { writing, singleLine, authenticityToken, className } = this.props;

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

      {(() => {
        if(!singleLine) {
          <div className='writing-item__updated-at'>
            {this.getFormattedDate(writing.updated_at)}
          </div>
        }
      })()}

      {/* 아래 if 문의 조건을 위한 별도의 값 필요. authenticityToken를 사용하는 것은 잘못되었다 */}
      {(() => {
        if(authenticityToken) {
          <div className='writing-item__button-container'>
            <Link className='button-container__edit-button' to={`/writings/${writing.id}/edit`}>
              Edit
            </Link>

            <OneButtonForm formClassName='button-container__delete-form'
                           buttonClassName='delete-form__button'
                           authenticityToken={authenticityToken}
                           action={`/writings/${writing.id}`}
                           method='delete'
                           label='Delete' />
          </div>
        }
      })()}

      {(() => {
        if(!singleLine) {
          <div className='writing-item__content'>
            <div className='writing-item__decoded-content'></div>
            <textarea className='writing-item__original-content'>
              {writing.content}
            </textarea>
          </div>
        }
      })()}
    </div>
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
