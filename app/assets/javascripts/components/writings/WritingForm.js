import React, { Component } from 'react'
import { Link } from 'react-router'

import RailsForm from '../commons/RailsForm'
import InputWithLabel from '../commons/InputWithLabel'
import ElementsWithLabel from '../commons/ElementsWithLabel'

export default class WritingForm extends Component {
  static defaultProps = {
    method: 'post'
  }

  state = {
    writing: this.props.writing || {
      title: '',
      content: ''
    }
  }

  componentDidMount () {
    const { onLoadNewWriting } = this.props
    onLoadNewWriting()
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
      <RailsForm className='writing-form form-horizontal'
                 action={action}
                 method={method}
                 authenticityToken={authenticityToken} >

        <InputWithLabel id='writing_title'
                        name='writing[title]'
                        placeholder='Title'
                        labelText='Title'
                        value={writing.title}
                        onChange={this.onTitleChanged} />

        <InputWithLabel id='writing_category_id'
                        name='writing[category_id]'
                        placeholder='Category'
                        labelText='Category'
                        elementType='select'
                        value={writing.category_id}
                        options={categories}
                        onChange={this.onCategoryChanged} />

        <InputWithLabel id='writing_content'
                        name='writing[content]'
                        labelText='Content'
                        elementType='textarea'
                        value={writing.content}
                        onChange={this.onContentChanged} />

        <ElementsWithLabel>
          <input id='submit' type='submit' value='submit' />
          <Link to={this.getCancelUrl()} id='cancel'>cancel</Link>
        </ElementsWithLabel>
      </RailsForm>
    )

  }
}
