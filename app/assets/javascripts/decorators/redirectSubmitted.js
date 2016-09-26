import { browserHistory } from 'react-router'

function redirect (pathCreator, predicate) {
  return Component =>
    class Composed extends React.Component {
      componentWillMount () {
        if(predicate(this.props)) {
          const path = pathCreator(this.props)
          browserHistory.push(path)
        }
      }

      componentWillReceiveProps (nextProps) {
        if(predicate(nextProps)) {
          const path = pathCreator(this.props)
          browserHistory.push(path)
        }
      }

      render () {
        return <Component {...this.props} />
      }
    }
}

export default function redirectSubmitted (pathCreator) {
  return redirect(pathCreator, ({ submitted }) => submitted)
}
