D = React.DOM

window.WritingForm = React.createClass
  displayName: 'WritingForm'

  getInitialState: ->
    {
      writing: (@props.writing || {
        title:   ''
        content: ''
      })
    }

  getDefaultProps: ->
    method: 'post'
    # writing: undefined # writing is only used for init state.writing

  titleChanged: (event) ->
    @state.writing.title = event.target.value
    @forceUpdate()

  contentChanged: (event) ->
    @state.writing.content = event.target.value
    @forceUpdate()

  onSubmit: (event) ->
    # event.preventDefault();
    console.log('!')

  getCancelUrl: ->
    if @state.writing.id isnt undefined
      '/writings/'+@state.writing.id
    else
      '/writings'


  render: ->
    railsForm
      className: "writing-form form-horizontal"
      action: @props.action
      method: @props.method
      authenticityToken: @props.authenticityToken

      children: [
        inputWithLabel
          id:          'writing_title'
          key:         'writing_title'
          name:        'writing[title]'
          className:   'writing-form__input-with-label'
          placeholder: 'Title'
          labelText:   'Title'
          value:       @state.writing.title
          onChange:    @titleChanged

        inputWithLabel
          id:          'content'
          key:         'content'
          name:        'writing[content]'
          className:   'writing-form__input-with-label'
          labelText:   'Content'
          value:       @state.writing.content
          elementType: 'textarea'
          onChange:    @contentChanged

        ElementsWithLabel
          className: 'writing-form__elements-with-label'
          key: "buttons"
          children: [
            D.input
              id: 'submit'
              key: 'submit'
              type: 'submit'
              value: 'submit'
              className: 'btn btn-primary'
            ' '
            D.a
              id: 'cancel'
              key: 'cancel'
              href: @getCancelUrl()
              'cancel'
          ]
      ]

window.writingForm = React.createFactory(WritingForm)
