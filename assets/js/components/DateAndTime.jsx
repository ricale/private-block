import React, { Component } from 'react'

export default class DateAndTime extends Component {
  static defaultProps = {
    datetimeString: '',
    className: '',
    withParentheses: false
  }

  getFormattedDateAndTime (dateString) {
    if(!dateString) {
      return {
        date: '',
        time: ''
      }
    }

    let d = new Date(dateString)

    let year    = d.getFullYear()
    let month   = (d.getMonth() + 1)
    let date    = d.getDate()
    let hours   = d.getHours()
    let minutes = d.getMinutes()

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
    const {className, datetimeString, withParentheses} = this.props

    const datetime = this.getFormattedDateAndTime(datetimeString)

    return (
      <span className={`date-and-time ${className}`}>
        {withParentheses && '('}
        <span className='date-and-time__date'>
          {datetime.date}
        </span>
        {' '}
        <span className='date-and-time__time'>
          {datetime.time}
        </span>
        {withParentheses && ')'}
      </span>
    )
  }
}
