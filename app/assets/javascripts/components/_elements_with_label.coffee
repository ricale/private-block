D = React.DOM

window.ElementsWithLabel = React.createClass
  displayName: "ElementsWithLabel"
  getInitialState: ->
    {}

  getDefaultProps: ->
    id:            undefined
    labelText:     ''
    placeholder:   ''
    value:         undefined
    onChange:      undefined
    children:      []

  render: ->
    D.div
      className: "form-group"
      D.label
        htmlFor: @props.id
        className: "col-lg-2 control-label"
        @props.labelText

      D.div
        className: "col-lg-10"
        @props.children

window.ElementsWithLabel = React.createFactory(ElementsWithLabel)
