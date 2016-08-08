D = React.DOM

window.ElementsWithLabel = React.createClass
  displayName: "ElementsWithLabel"
  getInitialState: ->
    {}

  getDefaultProps: ->
    id:            undefined
    className:     ''
    labelText:     ''
    placeholder:   ''
    value:         undefined
    onChange:      undefined
    children:      []

  render: ->
    D.div
      className: "elements-with-label form-group " + @props.className
      D.label
        htmlFor: @props.id
        className: "elements-with-label__label col-lg-2 control-label"
        @props.labelText

      D.div
        className: "elements-with-label__elements-container col-lg-10"
        @props.children

window.ElementsWithLabel = React.createFactory(ElementsWithLabel)
