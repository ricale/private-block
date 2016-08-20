D = React.DOM

window.CategoryMenu = React.createClass
  displayName: 'CategoryMenu'

  getInitialState: ->
    {}

  getDefaultProps: ->
    showNewLink: true
    showListLink: true


  render: ->
    D.ul
      className: 'category-menu'

      if @props.showNewLink
        D.li
          className: 'category-menu__item'
          D.a
            href: '/categories/new'
            'New'

      if @props.showListLink
        D.li
          className: 'category-menu__item'
          D.a
            href: '/categories'
            'List'

window.categoryMenu = React.createFactory(CategoryMenu)
