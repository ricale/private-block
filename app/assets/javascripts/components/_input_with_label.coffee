D = React.DOM

window.InputWithLabel = React.createClass
  displayName: "InputWithLabel"
  getInitialState: ->
    {}

  getDefaultProps: ->
    id:            undefined
    className:     ''
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
      className: "input-with-label form-group " + @props.className

      D.label
        htmlFor: @props.id
        className: "input-with-label__label col-lg-2 control-label"
        @props.labelText

      D.div
        className: "input-with-label__input-wrapper col-lg-10"
        D[@props.elementType]
          className:   "input-with-label__"+@props.elementType+" form-control"
          placeholder: @props.placeholder
          id:          @props.id
          type:        @getTypeAttribute()
          name:        @props.name
          value:       @props.value
          onChange:    @props.onChange

window.inputWithLabel = React.createFactory(InputWithLabel)