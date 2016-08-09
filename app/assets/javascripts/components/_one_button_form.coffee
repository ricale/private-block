D = React.DOM

window.OneButtonForm = React.createClass
  displayName: 'OneButtonForm'

  getInitialState: ->
    {
    }

  getDefaultProps: ->
    authenticityToken: undefined
    formClassName:     ''
    buttonClassName:   ''
    method:            'delete'
    label:             'Delete'


  render: ->
    railsForm
      className:         'one-button-form ' + @props.formClassName
      authenticityToken: @props.authenticityToken
      action:            @props.action
      method:            @props.method
      children:
        D.input
          id: 'submit'
          className: 'one-button-form__button ' + @props.buttonClassName
          key: 'submit'
          type: 'submit'
          value: @props.label

window.oneButtonForm = React.createFactory(OneButtonForm)
