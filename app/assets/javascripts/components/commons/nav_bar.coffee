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
    D.div
      className: 'top-nav-bar'

      oneButtonForm
        authenticityToken: @props.authenticityToken
        action: '/users/sign_out/'
        method: 'delete'
        label:  'Log Out'

window.navBar = React.createFactory(NavBar)