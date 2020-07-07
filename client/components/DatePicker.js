import React from 'react'
import MyDatePicker from './MyDatePicker'

function onChange(timestamp) {
  console.log(timestamp)
}

function DatePicker() {
  return (
    <div className="DatePicker">
      <MyDatePicker onChange={onChange} />
    </div>
  )
}

export default DatePicker
