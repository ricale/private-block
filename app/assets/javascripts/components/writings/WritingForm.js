import React, { Component } from 'react'
import { browserHistory } from 'react-router';

import connectSubmitForm from '../../connectSubmitForm'

import InputWithLabel from '../commons/InputWithLabel'
import ElementsWithLabel from '../commons/ElementsWithLabel'
import Hme from '../commons/Hme'

import redirectSubmitted from '../../decorators/redirectSubmitted'

@redirectSubmitted(props => props.writing && props.writing.id ? `/${props.writing.id}` : '/writings')
class WritingForm extends Component {
  static defaultProps = {
    method: 'post',
    id: undefined,
    writing: undefined
  }

  state = {
    writing: this.props.writing || {}
  }

  componentWillMount () {
    this.redirectToSignInPageIfNeeded()
  }

  componentDidMount () {
    const { fetchWriting, writing, categories, id } = this.props

    if(!!writing) {
      this.setState({writing: writing});
    }
  }

  redirectToSignInPageIfNeeded () {
    if(!this.props.session.valid) {
      browserHistory.push('/users/sign_in')
    }
  }

  onTitleChanged (event) {
    this.state.writing.title = event.target.value
    this.forceUpdate()
  }

  onCategoryChanged (event) {
    this.state.writing.category_id = event.target.value
    this.forceUpdate()
  }

  onContentChanged (event) {
    this.state.writing.content = event.target.value
    this.forceUpdate()
  }

  onSubmit (event) {
    event.preventDefault()
    const { session, onSubmit } = this.props
    const { writing } = this.state

    const data = {
      writing,
      authenticity_token: session.authenticityToken
    }

    onSubmit(data)
  }

  getCancelUrl () {
    const { writing } = this.state;
    if(writing.id) {
      return `/writings/${writing.id}`
    } else {
      return '/writings'
    }
  }

  getCategoryOptions () {
    const { categories } = this.props
    let categoryOptions = []

    for(let key in categories) {
      categoryOptions[key] = Object.assign({}, categories[key])

      for(let i = 0; i < categoryOptions[key].depth; i++) {
        categoryOptions[key].name = `. . . ${categoryOptions[key].name}`
      }
    }

    return categoryOptions
  }

  render () {
    const { action, method, authenticityToken } = this.props
    const { writing } = this.state

    const categoryOptions = this.getCategoryOptions()

    return (
      <form className='writing-form'
            onSubmit={this.onSubmit.bind(this)}>

        <InputWithLabel id='writing_title'
                        inputClassName='writing-form__title-input'
                        name='writing[title]'
                        placeholder='Title'
                        labelText='Title'
                        value={writing.title}
                        onChange={this.onTitleChanged.bind(this)} />

        <InputWithLabel id='writing_category_id'
                        inputClassName='writing-form__category-select'
                        name='writing[category_id]'
                        placeholder='Category'
                        labelText='Category'
                        elementType='select'
                        value={writing.category_id}
                        options={categoryOptions}
                        onChange={this.onCategoryChanged.bind(this)} />

        <div>
          <label htmlFor='writing_content'>Content</label>
          <Hme name='writing[content]' value={writing.content || ''} onChange={this.onContentChanged.bind(this)} />
        </div>

        <ElementsWithLabel>
          <input id='submit' type='submit' value='submit' />
          {' '}
          <a href={this.getCancelUrl()} id='cancel'>cancel</a>
        </ElementsWithLabel>
      </form>
    )

  }
}

export default connectSubmitForm(WritingForm)
