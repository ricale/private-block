import React, { Component } from 'react'

import Form from '../commons/Form';
import InputWithLabel from '../commons/InputWithLabel'
import ElementsWithLabel from '../commons/ElementsWithLabel'
import Hme from '../commons/Hme'

export default class WritingForm extends Component {
  static defaultProps = {
    writing: undefined
  };

  constructor (props) {
    super(props);
    this.state = {
      writing: props.writing || {}
    }
    this.onTitleChanged = this.onTitleChanged.bind(this);
    this.onCategoryChanged = this.onCategoryChanged.bind(this);
    this.onContentChanged = this.onContentChanged.bind(this);
  }

  componentDidMount () {
    const {writing} = this.props

    if(!!writing) {
      this.setState({writing: writing});
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

  getUrl () {
    const { writing } = this.state;
    if(writing.id) {
      return `/writings/${writing.id}`
    } else {
      return '/writings'
    }
  }

  getMethod () {
    const { writing } = this.state;
    return writing.id ? 'put' : 'post';
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
    const {session} = this.props
    const {writing} = this.state

    const categoryOptions = this.getCategoryOptions()

    return (
      <Form className='writing-form' action={this.getUrl()} method={this.getMethod()} token={session.authenticityToken}>
        <InputWithLabel id='writing_title'
                        inputClassName='writing-form__title-input'
                        name='writing[title]'
                        placeholder='Title'
                        labelText='Title'
                        value={writing.title}
                        onChange={this.onTitleChanged} />

        <InputWithLabel id='writing_category_id'
                        inputClassName='writing-form__category-select'
                        name='writing[category_id]'
                        placeholder='Category'
                        labelText='Category'
                        elementType='select'
                        value={writing.category_id}
                        options={categoryOptions}
                        onChange={this.onCategoryChanged} />

        <div>
          <label htmlFor='writing_content'>Content</label>
          <Hme name='writing[content]' value={writing.content || ''} onChange={this.onContentChanged} />
        </div>

        <ElementsWithLabel>
          <input id='submit' type='submit' value='submit' />
          {' '}
          <a href={this.getUrl()} id='cancel'>cancel</a>
        </ElementsWithLabel>
      </Form>
    )

  }
}
