D = React.DOM

window.NavBar = React.createClass
  displayName: 'NavBar'

  getInitialState: ->
    {
    }

  getDefaultProps: ->
    writings: []
    authenticityToken: undefined


  render: ->
    D.div {},
      logOutButton
        authenticityToken: @props.authenticityToken

window.navBar = React.createFactory(NavBar)