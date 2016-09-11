import React, { Component } from 'react'

export default class DateAndTime extends Component {
  static defaultProps = {
    datetimeString: '',
    className: '',
    withParentheses: false
  }

  getFormattedDateAndTime (dateString) {
    var d = new Date(dateString)

    var year    = d.getFullYear()
    var month   = (d.getMonth() + 1)
    var date    = d.getDate()
    var hours   = d.getHours()
    var minutes = d.getMinutes()

    if (month   < 10) month   = '0' + month
    if (date    < 10) date    = '0' + date
    if (hours   < 10) hours   = '0' + hours
    if (minutes < 10) minutes = '0' + minutes

    return {
      date: year+'.'+month+'.'+date,
      time: hours+':'+minutes
    }
  }

  render () {
    const { className, datetimeString, withParentheses } = this.props

    const datetime = this.getFormattedDateAndTime(datetimeString)

    return (
      <div className={`date-and-time ${className}`}>
        {withParentheses && '('}
        <span className='date-and-time__date'>
          {datetime.date}
        </span>
        {' '}
        <span className='date-and-time__time'>
          {datetime.time}
        </span>
        {withParentheses && ')'}
      </div>
    )
  }
}