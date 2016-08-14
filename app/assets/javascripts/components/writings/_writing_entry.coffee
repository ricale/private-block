D = React.DOM

window.WritingEntry = React.createClass
  displayName: 'WritingEntry'

  componentDidMount: ->
    if !@props.singleLine
      sourceElement = document.querySelector('#writing-entry-'+@props.writing.id+' .writing-entry__original-content');
      targetElement = document.querySelector('#writing-entry-'+@props.writing.id+' .writing-entry__decoded-content');
      hmd.run(sourceElement, targetElement);

  getInitialState: ->
    {}

  getDefaultProps: ->
    authenticityToken: undefined
    className: ''

    singleLine: false

  getCssModifier: ->
    if @props.singleLine
      '_single-line'
    else
      ''

  getFormattedDate: (dateString) ->
    d = new Date(dateString)

    year    = d.getFullYear()
    month   = (d.getMonth() + 1)
    date    = d.getDate()
    hours   = d.getHours()
    minutes = d.getMinutes()

    month   = '0' + month   if month < 10
    date    = '0' + date    if date < 10
    hours   = '0' + hours   if hours < 10
    minutes = '0' + minutes if minutes < 10

    year+'.'+month+'.'+date+' '+hours+':'+minutes

  render: ->
    console.log("!")
    D.div
      className: 'writing-entry'+@getCssModifier()+' ' + @props.className
      id: @props.id || 'writing-entry-'+@props.writing.id

      D.div
        className: 'writing-entry__title'

        D.a
          href: '/writings/'+@props.writing.id

          @props.writing.title

      D.div
        className: 'writing-entry__created-at'
        @getFormattedDate(@props.writing.created_at)

      D.div
        className: 'writing-entry__updated-at'
        @getFormattedDate(@props.writing.updated_at)

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

      if !@props.singleLine
        D.div
          className: 'writing-entry__content'

          D.div
            className: 'writing-entry__decoded-content'

          D.textarea
            className: 'writing-entry__original-content'
            defaultValue: @props.writing.content

window.writingEntry = React.createFactory(WritingEntry)
