D = React.DOM

window.CategoryList = React.createClass
  displayName: 'CategoryList'

  getInitialState: ->
    {
    }

  getDefaultProps: ->
    categories: []


  render: ->
    D.div
      className: 'category-list'

      for category, n in @props.categories
        ((i) =>
          categoryItem
            key:       "category-item-#{n}"
            className: 'category-list__category-item'
            category:   category
            authenticityToken: @props.authenticityToken
        )(n)

window.categoryList = React.createFactory(CategoryList)