D = React.DOM

window.WritingList = React.createClass
  displayName: 'WritingList'

  getInitialState: ->
    {
    }

  getDefaultProps: ->
    writings: []
    authenticityToken: undefined


  render: ->
    D.div
      className: 'writing-list'

      for writing, n in @props.writings
        ((i) =>
          writingEntry
            id:        "writing-entry-#{i}"
            key:       "writing-entry-#{i}"
            className: 'writing-list__writing-entry'
            writing:   writing
            authenticityToken: @props.authenticityToken
        )(n)

window.writingList = React.createFactory(WritingList)