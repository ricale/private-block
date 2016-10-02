import React, { Component } from 'react'
import { Link } from 'react-router'
import { browserHistory } from 'react-router';

import connectSubmitForm from '../../connectSubmitForm'

import InputWithLabel from '../commons/InputWithLabel'
import ElementsWithLabel from '../commons/ElementsWithLabel'
import Hme from '../commons/Hme'

import redirectSubmitted from '../../decorators/redirectSubmitted'

@redirectSubmitted(props => props.writing && props.writing.id ? `/writings/${props.writing.id}` : '/writings')
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

    if(!categories || categories.length === 0 ||
       !writing || (!id && !writing.id) || id !== writing.id) {
      fetchWriting(id, {withCategories: true})
    } else {
      this.setState({writing: writing})
    }
  }

  componentWillUpdate () {
    this.redirectToSignInPageIfNeeded()
  }

  componentWillReceiveProps (nextProps) {
    const { fetchWriting, id, writing } = this.props

    if(id !== nextProps.id) {
      fetchWriting(nextProps.id, {withCategories: true})

    } else if (writing && writing.id !== nextProps.writing.id) {
      this.setState({writing: nextProps.writing})
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

  render () {
    const { action, method, authenticityToken, categories } = this.props
    const { writing } = this.state

    return (
      <form className='writing-form'
            onSubmit={this.onSubmit.bind(this)}>

        <InputWithLabel id='writing_title'
                        name='writing[title]'
                        placeholder='Title'
                        labelText='Title'
                        value={writing.title}
                        onChange={this.onTitleChanged.bind(this)} />

        <InputWithLabel id='writing_category_id'
                        name='writing[category_id]'
                        placeholder='Category'
                        labelText='Category'
                        elementType='select'
                        value={writing.category_id}
                        options={categories}
                        onChange={this.onCategoryChanged.bind(this)} />

        <Hme name='writing[content]' value={writing.content || ''} onChange={this.onContentChanged.bind(this)} />

        <ElementsWithLabel>
          <input id='submit' type='submit' value='submit' />
          {' '}
          <Link to={this.getCancelUrl()} id='cancel'>cancel</Link>
        </ElementsWithLabel>
      </form>
    )

  }
}

export default connectSubmitForm(WritingForm)
