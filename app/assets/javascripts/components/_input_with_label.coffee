D = React.DOM

window.InputWithLabel = React.createClass
  displayName: "InputWithLabel"
  getInitialState: ->
    {}

  getDefaultProps: ->
    id:            undefined
    labelText:     ''
    placeholder:   ''
    value:         undefined
    onChange:      undefined
    elementType:   "input"
    typeAttribute: "text"

  getTypeAttribute: ->
    {
      "input":    @props.typeAttribute,
      "textarea": null
    }[@props.elementType]

  render: ->
    D.div
      className: "form-group"
      D.label
        htmlFor: @props.id
        className: "col-lg-2 control-label"
        @props.labelText

      D.div
        className: "col-lg-10"
        D[@props.elementType]
          className:   "form-control"
          placeholder: @props.placeholder
          id:          @props.id
          type:        @getTypeAttribute()
          value:       @props.value
          onChange:    @props.onChange

window.inputWithLabel = React.createFactory(InputWithLabel)