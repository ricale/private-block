D = React.DOM

window.WritingEntry = React.createClass
  displayName: 'WritingEntry'

  componentDidMount: ->
    sourceElement = document.querySelector('#writing-entry-'+@props.writing.id+' .writing-entry__original-content');
    targetElement = document.querySelector('#writing-entry-'+@props.writing.id+' .writing-entry__decoded-content');
    hmd.run(sourceElement, targetElement);

  getInitialState: ->
    {}

  getDefaultProps: ->
    authenticityToken: undefined
    className: ''

  render: ->
    D.div
      className: 'writing-entry ' + @props.className
      id: @props.id || 'writing-entry-'+@props.writing.id

      D.div
        className: 'writing-entry__title'

        D.a
          href: '/writings/'+@props.writing.id

          @props.writing.title

      D.div
        className: 'writing-entry__created-at'
        @props.writing.created_at

      D.div
        className: 'writing-entry__updated-at'
        @props.writing.created_at

      if @props.authenticityToken isnt undefined
        D.div
          className: 'writing-entry__buttons-container'

          D.a
            className: 'buttons-container__edit-button'
            href: '/writings/'+@props.writing.id+'/edit'
            'Edit'

          oneButtonForm
            formClassName:   'buttons-container__delete-form'
            buttonClassName: 'delete-form__button'
            authenticityToken: @props.authenticityToken
            action: '/writings/'+@props.writing.id
            method: 'delete'
            label: 'Delete'

      D.div
        className: 'writing-entry__decoded-content'

      D.textarea
        className: 'writing-entry__original-content'
        @props.writing.content

window.writingEntry = React.createFactory(WritingEntry)
