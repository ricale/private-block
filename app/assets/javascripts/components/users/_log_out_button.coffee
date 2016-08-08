D = React.DOM

window.LogOutButton = React.createClass
  displayName: 'LogOutButton'

  getInitialState: ->
    {
    }

  getDefaultProps: ->
    authenticityToken: undefined
    buttonClassName: 'btn btn-xs btn-link'


  render: ->
    railsForm
      className: 'log-out-button-form form-inline'
      authenticityToken: @props.authenticityToken
      action: '/users/sign_out/'
      method: 'delete'
      children:
        D.input
          id: 'submit'
          className: 'log-out-button-form__button ' + @props.buttonClassName
          key: 'submit'
          type: 'submit'
          value: 'Log Out'

window.logOutButton = React.createFactory(LogOutButton)
