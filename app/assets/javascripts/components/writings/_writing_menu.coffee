D = React.DOM

window.WritingMenu = React.createClass
  displayName: 'WritingMenu'

  getInitialState: ->
    {}

  getDefaultProps: ->
    showNewLink: true
    showListLink: true


  render: ->
    D.ul
      className: 'writing-menu'

      if @props.showNewLink
        D.li
          className: 'writing-menu__item'
          D.a
            href: '/writings/new'
            'New'

      if @props.showListLink
        D.li
          className: 'writing-menu__item'
          D.a
            href: '/writings'
            'List'

window.writingMenu = React.createFactory(WritingMenu)
