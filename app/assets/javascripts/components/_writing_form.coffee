D = React.DOM

window.WritingForm = React.createClass
  displayName: 'WritingForm'

  getInitialState: ->
    {
      writing: {
        title:   ''
        content: ''
      }
    }

  getDefaultProps: ->
    {}


  titleChanged: (event) ->
    @state.writing.title = event.target.value
    @forceUpdate()

  contentChanged: (event) ->
    @state.writing.content = event.target.value
    @forceUpdate()


  render: ->
    D.form
      className: "form-horizontal"
      inputWithLabel
        id:          "title"
        placeholder: "Title"
        labelText:   "Title"
        value:       @state.writing.title
        onChange:    @titleChanged

      inputWithLabel
        id:          "content"
        labelText:   "Content"
        value:       @state.writing.content
        elementType: "textarea"
        onChange:    @contentChanged

window.writingForm = React.createFactory(WritingForm)
