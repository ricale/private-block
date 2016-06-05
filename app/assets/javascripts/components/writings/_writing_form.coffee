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
    method: 'post'


  titleChanged: (event) ->
    @state.writing.title = event.target.value
    @forceUpdate()

  contentChanged: (event) ->
    @state.writing.content = event.target.value1
    @forceUpdate()

  onSubmit: (event) ->
    # event.preventDefault();
    console.log('!')


  render: ->
    D.form
      className: "form-horizontal"
      action: @props.action
      method: @props.method
      'data-remote': true

      onSubmit: @onSubmit

      D.input
        type: 'hidden'
        name: 'authenticity_token'
        value: @props.authenticityToken

      inputWithLabel
        id:          "writing_title"
        name:        "writing[title]"
        placeholder: "Title"
        labelText:   "Title"
        value:       @state.writing.title
        onChange:    @titleChanged

      inputWithLabel
        id:          "content"
        name:        "writing[content]"
        labelText:   "Content"
        value:       @state.writing.content
        elementType: "textarea"
        onChange:    @contentChanged

      ElementsWithLabel
        children: [
          D.input
            id: 'submit'
            key: 'submit'
            type: 'submit'
            value: 'submit'
          D.input
            id: 'cancel'
            key: 'cancel'
            type: 'button'
            value: 'cancel'
        ]

window.writingForm = React.createFactory(WritingForm)
