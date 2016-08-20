D = React.DOM

window.CategoryForm = React.createClass
  displayName: 'CategoryForm'

  getInitialState: ->
    {
      category: (@props.category || {
        name: ''
      })
    }

  getDefaultProps: ->
    method: 'post'

  nameChanged: (event) ->
    @state.category.name = event.target.value
    @forceUpdate()

  parentChanged: (event) ->
    @state.category.parent_id = event.target.value
    @forceUpdate()

  onSubmit: (event) ->
    # event.preventDefault();

  getCancelUrl: ->
    if @state.category.id isnt undefined
      '/categories/'+@state.category.id
    else
      '/categories'

  getRootCategoryId: ->
    1


  render: ->
    railsForm
      className: "category-form form-horizontal"
      action: @props.action
      method: @props.method
      authenticityToken: @props.authenticityToken

      children: [
        inputWithLabel
          id:          'category_name'
          key:         'category_name'
          name:        'category[name]'
          className:   'category-form__name-input'
          placeholder: 'Name'
          labelText:   'Name'
          value:       @state.category.name
          onChange:    @nameChanged

        if @state.category.id isnt @getRootCategoryId()
          inputWithLabel
            id:          'category_parent_id'
            key:         'category_parent_id'
            name:        'category[parent_id]'
            className:   'category-form__parent-select'
            placeholder: 'Parent'
            labelText:   'Parent'
            elementType: 'select'
            value:       @state.category.parent_id
            onChange:    @parentChanged
            options:     @props.parents

        ElementsWithLabel
          className: 'category-form__buttons-container'
          key: 'category-form__buttons-container'
          children: [
            D.input
              id: 'submit'
              key: 'submit'
              type: 'submit'
              value: 'submit'
              className: 'btn btn-primary'
            ' '
            D.a
              id: 'cancel'
              key: 'cancel'
              href: @getCancelUrl()
              'cancel'
          ]
      ]

window.categoryForm = React.createFactory(CategoryForm)
