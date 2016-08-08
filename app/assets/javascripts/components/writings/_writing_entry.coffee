D = React.DOM

window.WritingEntry = React.createClass
  displayName: 'WritingEntry'

  getInitialState: ->
    {}

  getDefaultProps: ->
    authenticityToken: undefined
    className: ''

  render: ->
    D.div
      className: 'writing-entry ' + @props.className
      id: @props.id

      D.span
        className: 'writing-entry__title'

        D.a
          href: '/writings/'+@props.writing.id

          @props.writing.title

      D.span
        className: 'writing-entry__content'
        @props.writing.content

      D.span
        className: 'writing-entry__created-at'
        @props.writing.created_at

      D.span
        className: 'writing-entry__updated-at'
        @props.writing.created_at

      if @props.authenticityToken isnt undefined
        D.span
          className: 'writing-entry__buttons-container'

          railsForm
            className: 'buttons-container__delete-form form-inline'
            authenticityToken: @props.authenticityToken
            action: '/writings/'+@props.writing.id
            method: 'delete'
            children:
              D.input
                id: 'submit'
                className: 'delete-form__button btn btn-warning'
                key: 'submit'
                type: 'submit'
                value: 'Delete'

window.writingEntry = React.createFactory(WritingEntry)