import React, { Component } from 'react'
import { Link } from 'react-router'


export default class WritingItem extends Component {
  static defaultProps = {
    singleLine: false,
    className: ''
  }

  state = {
    decodedContent: ''
  }

  componentWillMount () {
    const { onLoadWriting, id } = this.props
    if(id) {
      onLoadWriting(id)
    } else {
      this.showDecodedContent(this.props)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { onLoadWriting, id } = this.props

    if(id && id != nextProps.id) {
      onLoadWriting(id)
    } else {
      this.showDecodedContent(nextProps)
    }
  }

  showDecodedContent (props) {
    const { singleLine, writing } = props

    if(!singleLine && writing && writing.content) {
      const element = document.createElement("div")
      element.innerHTML = writing.content
      this.setState({decodedContent: hmd.decode(element.innerText)})
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

  getCategoryLink (id) {
    return `/categories/${id}/writings`
  }

  renderCategoryName () {
    const { writing } = this.props
    {/* 상수를 박아놓을 것이 아니라, parentCategoryTypeId 따위가 필요 */}
    const rootCategoryId = 1

    return (
      <div className='writing-item__category'>
        {(writing.parent_category_id && writing.parent_category_id != rootCategoryId) && (
          <Link to={this.getCategoryLink(writing.parent_category_id)}>
            {writing.parent_category_name}
          </Link>
        )}

        {(writing.parent_category_id && writing.parent_category_id != rootCategoryId) && (
          '/'
        )}

        <Link to={this.getCategoryLink(writing.category_id)}>
          {writing.category_name}
        </Link>
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
            <Link to={`/${writing.id}`}>{writing.title}</Link>
          </div>

          {/* 시간을 표시하는 엘리먼트를 getFormattedDate 메서드와 묶어서 하나의 컴포넌트로 만들자 */}
          <div className='writing-item__created-at'>
            {this.getFormattedDate(writing.created_at)}
          </div>

          {!singleLine && (
            <div className='writing-item__updated-at'>
              ({this.getFormattedDate(writing.updated_at)})
            </div>
          )}

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
      </div>
    )
  }
}
