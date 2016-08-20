D = React.DOM

window.CategoryMenu = React.createClass
  displayName: 'CategoryMenu'

  getInitialState: ->
    {}

  getDefaultProps: ->
    {}


  render: ->
    D.ul
      className: 'category-menu'

      D.li
        className: 'category-menu__item'
        D.a
          href: '/categories/new'
          'New'

      D.li
        className: 'category-menu__item'
        D.a
          href: '/categories'
          'List'

window.categoryMenu = React.createFactory(CategoryMenu)
