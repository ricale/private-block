D = React.DOM

window.RailsForm = React.createClass
  displayName: "RailsForm"
  getInitialState: ->
    {}

  getDefaultProps: ->
    className: ''

  getHTMLFormMethod: ->
    if (@props.method.toUpperCase() is 'GET')
      'get'
    else
      'post'

  render: ->
    D.form
      className: 'rails-form ' + @props.className
      action: @props.action
      method: @getHTMLFormMethod()

      onSubmit: @onSubmit

      D.div
        style:
          margin:  0
          padding: 0
          display: 'inline'

        D.input
          type: 'hidden'
          name: 'authenticity_token'
          value: @props.authenticityToken

        D.input
          type: 'hidden'
          name: '_method'
          value: @props.method

        D.input
          type: 'hidden'
          name: 'utf8'
          value: '✓'

      @props.children

window.railsForm = React.createFactory(RailsForm)
