import { browserHistory } from 'react-router'

function redirect (path, predicate) {
  return Component =>
    class Composed extends React.Component {
      componentWillMount () {
        if(predicate(this.props)) {
          browserHistory.push(path)
        }
      }

      componentWillReceiveProps (nextProps) {
        if(predicate(nextProps)) {
          browserHistory.push(path)
        }
      }

      render () {
        return <Component {...this.props} />
      }
    }
}

export default function redirectSubmitted (path) {
  return redirect(path, ({ submitted }) => submitted)
}
