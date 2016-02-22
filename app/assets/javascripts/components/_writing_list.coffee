D = React.DOM

window.WritingList = React.createClass
  displayName: 'WritingList'

  getInitialState: ->
    {
    }

  getDefaultProps: ->
    writings: []


  render: ->
    D.div
      className: 'writing-list'

      for writing, n in @props.writings
        ((i) =>
          writingEntry
            id:        "writing-#{i}"
            key:       "writing-#{i}"
            className: 'writing'
            writing:   writing
        )(n)

window.writingList = React.createFactory(WritingList)