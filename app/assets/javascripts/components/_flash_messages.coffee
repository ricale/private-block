D = React.DOM

window.FlashMessages = React.createClass
  displayName: 'FlashMessages'

  getInitialState: ->
    {}

  getDefaultProps: ->
    errors:    []
    warnings:  []
    notices:   []
    successes: []

  render: ->
    D.div
      className: 'flash-messages'

      if @props.errors.length > 0
        for error, i in @props.errors
          D.div
            className: 'flash-message__error alert alert-danger'
            key: "flash-message__error_#{i}"
            error


window.flashMessages = React.createFactory(FlashMessages)