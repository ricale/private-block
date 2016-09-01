import React, { Component } from 'react'

export default class WritingForm extends Component {
  getInitialState () {
    const emptyWriting = {
      title: '',
      content: ''
    }

    return {
      writing: (this.props.writing || emptyWriting)
    }
  }

  getDefaultProps () {
    return {
      method: 'post'
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
                        className='writing-form__input-with-label'
                        placeholder='Title'
                        labelText='Title'
                        value={writing.title}
                        onChange={this.onTitleChanged.bind(this)} />

        <InputWithLabel id='writing_category_id'
                        name='writing[category_id]'
                        className='writing-form__category-select'
                        placeholder='Category'
                        labelText='Category'
                        elementType='select'
                        value={writing.category_id}
                        options={categories}
                        onChange={this.onCategoryChanged.bind(this)} />

        <InputWithLabel id='writing_content'
                        name='writing[content]'
                        className='writing-form__input-with-label'
                        labelText='Content'
                        elementType='textarea'
                        value={writing.content}
                        onChange={this.onContentChanged.bind(this)} />

        <ElementsWithLabel className='writing-form__elements-with-label'>
          <Input id='submit' type='submit' value='submit' />
          <Link id='cancel' href={this.getCancelUrl()}>cancel</Link>
        </ElementsWithLabel>
      </RailsForm>
    )

  }
}
