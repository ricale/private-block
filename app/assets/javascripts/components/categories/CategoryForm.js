import React, { Component } from 'react'
import { Link } from 'react-router'

import connectSubmitForm from '../../connectSubmitForm'

import InputWithLabel from '../commons/InputWithLabel'
import ElementsWithLabel from '../commons/ElementsWithLabel'

import redirectSubmitted from '../../decorators/redirectSubmitted'

@redirectSubmitted('/categories')
class CategoryForm extends Component {
  static defaultProps = {
    method: 'post',
    id: undefined,
    category: undefined
  }

  state = {
    category: this.props.category || {}
  }

  componentWillMount () {
    const { fetchCategory, category, parents, id } = this.props

    if(!parents || parents.length === 0 ||
       !category || category.id !== id) {
      fetchCategory(id)

    } else {
      this.setState({category: category})
    }
  }

  componentWillReceiveProps (nextProps) {
    const { fetchCategory, id } = this.props
    const category          = this.props.category || {}
    const nextPropsCategory = nextProps.category || {}

    if(id !== nextProps.id) {
      fetchCategory(nextProps.id)

    } else if (category.id !== nextPropsCategory.id) {
      this.setState({category: nextPropsCategory})
    }
  }

  nameChanged (event) {
    this.state.category.name = event.target.value
    this.forceUpdate()
  }

  parentChanged (event) {
    this.state.category.parent_id = event.target.value
    this.forceUpdate()
  }

  onSubmit (event) {
    event.preventDefault()
    const { authenticityToken, onSubmit } = this.props
    const { category } = this.state

    const data = {
      category,
      authenticity_token: authenticityToken
    }

    onSubmit(data)
  }

  getCancelUrl () {
    if(category) {
      return `/categories/${category.id}`
    } else {
      return 
    }
  }

  getRootCategoryId () {
    return 1
  }

  render () {
    const { category } = this.state
    const { parents } = this.props

    return (
      <form className='category-form form-horizontal'
            onSubmit={this.onSubmit.bind(this)}>
        <InputWithLabel id='category_name'
                        key='category_name'
                        name='category[name]'
                        className='category-form__name-input'
                        placeholde='Name'
                        labelText='Name'
                        value={category.name}
                        onChange={this.nameChanged.bind(this)}/>

        {category.id !== this.getRootCategoryId() &&
          <InputWithLabel id='category_parent_id'
                          key='category_parent_id'
                          name='category[parent_id]'
                          className='category-form__parent-select'
                          placeholder='Parent'
                          labelText='Parent'
                          elementType='select'
                          value={category.parent_id}
                          onChange={this.parentChanged.bind(this)}
                          options={parents}/>
        }

        <ElementsWithLabel>
          <input id='submit' type='submit' value='submit' />
          {' '}
          <Link to='/categories' id='cancel'>cancel</Link>
        </ElementsWithLabel>
      </form>
    )
  }
}

export default connectSubmitForm(CategoryForm)
