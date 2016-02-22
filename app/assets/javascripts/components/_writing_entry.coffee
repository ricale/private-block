D = React.DOM

window.WritingEntry = React.createClass
  displayName: 'WritingEntry'

  getInitialState: ->
    {}

  getDefaultProps: ->
    {
      title: undefined,
      author: {
        name: undefined
      },
      created_at: undefined
    }

  render: ->
    D.div
      id: @props.id

      D.span
        className: 'writing-title'
        @props.writing.title

      D.span
        className: 'writing-author'
        @props.writing.author.name

      D.span
        className: 'writing-created-at'
        @props.writing.created_at

window.writingEntry = React.createFactory(WritingEntry)