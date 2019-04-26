import React, { useState, useMemo, useEffect } from 'react'
import moment from 'moment'
import Select from 'react-select'

import './index.css'

moment.updateLocale('es', {})

const createOptions = ({ interval }) => {
  const options = []
  const maxTime = { hour: 23, minute: 59 }

  const actualMoment = moment('12:00', 'HH:mm')
  const maxMomentTime = moment(actualMoment).set(maxTime)

  while (actualMoment.isBefore(maxMomentTime)) {
    options.push({ value: actualMoment.format(), label: actualMoment.format('HH:mm') })
    actualMoment.add(interval, 'minutes')
  }

  return options
}

const hsLabel = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    position: 'absolute',
    right: '4px',
    content: '"hs"',
    display: 'block',
    marginRight: 8,
    fontSize: 16,
  },
})

const warningBorder = data => console.log(data) || {}

const colourStyles = {
  input: styles => ({ ...styles, ...hsLabel() }),
  control: (styles, data) => ({ ...styles, ...warningBorder(data) }),
}

const TimeRangePicker = ({ handleRangeChange, handleErrorChange, timeStart, timeEnd }) => {
  const actualMoment = moment(timeStart || '12:00', 'HH:mm')
  const maxMomentTime = moment(timeEnd || '23:45', 'HH:mm')

  const [startTime, setStartTime] = useState({
    value: actualMoment.format(),
    label: actualMoment.format('HH:mm'),
    error: false,
  })
  const [endTime, setEndTime] = useState({
    value: maxMomentTime.format(),
    label: maxMomentTime.format('HH:mm'),
    error: false,
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (!error) return handleRangeChange({ startTime, endTime })
    return handleErrorChange(error)
  }, [startTime, endTime, error, handleRangeChange, handleErrorChange])

  const handleStartTimeChange = startTime => {
    setStartTime(startTime)

    return !moment(startTime.value).isBefore(endTime.value)
      ? setError('Por favor ingrese un rango válido. La hora de comienzo no puede estar después de la hora de fin.')
      : setError('')
  }

  const handleEndTimeChange = endTime => {
    setEndTime(endTime)

    return !moment(endTime.value).isAfter(startTime.value)
      ? setError('Por favor ingrese un rango válido. La hora de fin no puede estar antes de la hora de comienzo.')
      : setError('')
  }

  const options = useMemo(() => createOptions({ interval: 15 }), [])

  return (
    <div className='time-range-pickers'>
      <Select options={options} value={startTime} onChange={handleStartTimeChange} styles={colourStyles} />
      <Select options={options} value={endTime} onChange={handleEndTimeChange} styles={colourStyles} />
    </div>
  )
}

export default TimeRangePicker
