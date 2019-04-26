import React from 'react'
import ReactDOM from 'react-dom'

import TimeRangePicker from './components/TimeRangePicker'

ReactDOM.render(
  <TimeRangePicker
    timeStart={'12:00'}
    timeEnd={'23:00'}
    handleErrorChange={error => console.error(error)}
    handleRangeChange={({ startTime, endTime }) => console.log({ startTime, endTime })}
  />,
  document.querySelector('#root')
)
