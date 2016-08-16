D = React.DOM

window.CategoryItem = React.createClass
  displayName: 'CategoryItem'

  getInitialState: ->
    {}

  getDefaultProps: ->
    category: {}

  getCssModifier: ->
    if @props.category.depth isnt 0
      '_depth_'+@props.category.depth
    else
      ''


  render: ->
    D.div
      className: 'category-item'+@getCssModifier()+' ' + @props.className

      D.div
        className: 'category-item__name'
        @props.category.name

      D.div
        className: 'category-item__buttons-container'

        D.a
          className: 'buttons-container__edit-button'
          href: '/categories/'+@props.category.id+'/edit'
          'Edit'

        oneButtonForm
          formClassName:   'buttons-container__delete-form'
          buttonClassName: 'delete-form__button'
          authenticityToken: @props.authenticityToken
          action: '/categories/'+@props.category.id
          method: 'delete'
          label: 'Delete'


window.categoryItem = React.createFactory(CategoryItem)
