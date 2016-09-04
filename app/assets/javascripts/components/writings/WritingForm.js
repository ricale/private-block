import React, { Component } from 'react'
import { Link } from 'react-router'

import InputWithLabel from '../commons/InputWithLabel'
import ElementsWithLabel from '../commons/ElementsWithLabel'

export default class WritingForm extends Component {
  static defaultProps = {
    method: 'post',
    id: undefined
  }

  state = {
    writing: this.props.writing || {
      title: '',
      content: ''
    }
  }

  componentDidMount () {
    const { onLoadWriting, id } = this.props
    onLoadWriting(id, {withCategories: true})
  }

  componentWillReceiveProps (nextProps) {
    const { writing } = nextProps
    if(writing) {
      this.setState({writing})
    }
  }

  onTitleChanged (event) {
    this.state.writing.title = event.target.value
    this.forceUpdate()
  }

  onCategoryChanged (event) {
    this.state.writing.category_id = event.target.category_id
    this.forceUpdate()
  }

  onContentChanged (event) {
    this.state.writing.content = event.target.value
    this.forceUpdate()
  }

  onSubmit (event) {
    event.preventDefault()
    const { onSaveWriting, id } = this.props
    onSaveWriting(this.state.writing)
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
      <form className='writing-form form-horizontal'
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

        <InputWithLabel id='writing_content'
                        name='writing[content]'
                        labelText='Content'
                        elementType='textarea'
                        value={writing.content}
                        onChange={this.onContentChanged.bind(this)} />

        <ElementsWithLabel>
          <input id='submit' type='submit' value='submit' />
          <Link to={this.getCancelUrl()} id='cancel'>cancel</Link>
        </ElementsWithLabel>
      </form>
    )

  }
}
