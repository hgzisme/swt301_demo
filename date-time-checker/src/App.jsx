import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [inputDate, setInputDate] = useState('')
  const [inputTime, setInputTime] = useState('')
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
  const [customDate, setCustomDate] = useState(null)
  const [isValidDate, setIsValidDate] = useState(true)
  const [dateFormat, setDateFormat] = useState('ISO')
  const [timeFormat, setTimeFormat] = useState('24')

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Handle date input change
  const handleDateChange = (e) => {
    const value = e.target.value
    setInputDate(value)

    if (value) {
      const date = new Date(value)
      if (isNaN(date.getTime())) {
        setIsValidDate(false)
        setCustomDate(null)
      } else {
        setIsValidDate(true)
        setCustomDate(date)
      }
    } else {
      setIsValidDate(true)
      setCustomDate(null)
    }
  }

  // Handle time input change
  const handleTimeChange = (e) => {
    const value = e.target.value
    setInputTime(value)

    if (inputDate && value) {
      const dateTimeString = `${inputDate}T${value}`
      const date = new Date(dateTimeString)
      if (isNaN(date.getTime())) {
        setIsValidDate(false)
        setCustomDate(null)
      } else {
        setIsValidDate(true)
        setCustomDate(date)
      }
    }
  }

  // Format date based on selected format
  const formatDate = (date, format) => {
    switch (format) {
      case 'ISO':
        return date.toISOString()
      case 'Local':
        return date.toLocaleString()
      case 'UTC':
        return date.toUTCString()
      case 'Custom':
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
      default:
        return date.toString()
    }
  }

  // Format time based on 12/24 hour format
  const formatTime = (date, format) => {
    if (format === '12') {
      return date.toLocaleTimeString('en-US', { hour12: true })
    } else {
      return date.toLocaleTimeString('en-US', { hour12: false })
    }
  }

  // Get timezone offset
  const getTimezoneOffset = (date) => {
    const offset = date.getTimezoneOffset()
    const hours = Math.floor(Math.abs(offset) / 60)
    const minutes = Math.abs(offset) % 60
    const sign = offset > 0 ? '-' : '+'
    return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }

  // Calculate time difference
  const getTimeDifference = (date1, date2) => {
    const diff = Math.abs(date2.getTime() - date1.getTime())
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds }
  }

  const timeDiff = customDate ? getTimeDifference(currentTime, customDate) : null

  return (
    <div className="app">
      <header className="app-header">
        <h1>📅 Date & Time Checker</h1>
        <p>A comprehensive date and time testing tool</p>
      </header>

      <main className="main-content">
        {/* Current Time Display */}
        <section className="time-section">
          <h2>Current Date & Time</h2>
          <div className="time-display">
            <div className="current-time">
              <span className="time">{formatTime(currentTime, timeFormat)}</span>
              <span className="date">{currentTime.toLocaleDateString()}</span>
            </div>
            <div className="timezone-info">
              <p>Timezone: {timezone}</p>
              <p>UTC Offset: {getTimezoneOffset(currentTime)}</p>
            </div>
          </div>
        </section>

        {/* Format Controls */}
        <section className="controls-section">
          <h2>Display Settings</h2>
          <div className="controls">
            <div className="control-group">
              <label htmlFor="dateFormat">Date Format:</label>
              <select
                id="dateFormat"
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
              >
                <option value="ISO">ISO 8601</option>
                <option value="Local">Local</option>
                <option value="UTC">UTC</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            <div className="control-group">
              <label htmlFor="timeFormat">Time Format:</label>
              <select
                id="timeFormat"
                value={timeFormat}
                onChange={(e) => setTimeFormat(e.target.value)}
              >
                <option value="24">24 Hour</option>
                <option value="12">12 Hour</option>
              </select>
            </div>
          </div>
        </section>

        {/* Date Input Section */}
        <section className="input-section">
          <h2>Custom Date & Time Input</h2>
          <div className="date-input-container">
            <div className="input-group">
              <label htmlFor="dateInput">Date:</label>
              <input
                type="date"
                id="dateInput"
                value={inputDate}
                onChange={handleDateChange}
                className={!isValidDate ? 'invalid' : ''}
              />
            </div>
            <div className="input-group">
              <label htmlFor="timeInput">Time:</label>
              <input
                type="time"
                id="timeInput"
                value={inputTime}
                onChange={handleTimeChange}
                step="1"
              />
            </div>
          </div>

          {!isValidDate && (
            <div className="error-message">
              Invalid date format. Please enter a valid date.
            </div>
          )}
        </section>

        {/* Date Information Display */}
        <section className="info-section">
          <h2>Date Information</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Current Time</h3>
              <div className="info-details">
                <p><strong>Formatted:</strong> {formatDate(currentTime, dateFormat)}</p>
                <p><strong>Timestamp:</strong> {currentTime.getTime()}</p>
                <p><strong>Day of Week:</strong> {currentTime.toLocaleDateString('en-US', { weekday: 'long' })}</p>
                <p><strong>Week Number:</strong> {Math.ceil((currentTime - new Date(currentTime.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000))}</p>
              </div>
            </div>

            {customDate && (
              <div className="info-card">
                <h3>Custom Date</h3>
                <div className="info-details">
                  <p><strong>Formatted:</strong> {formatDate(customDate, dateFormat)}</p>
                  <p><strong>Timestamp:</strong> {customDate.getTime()}</p>
                  <p><strong>Day of Week:</strong> {customDate.toLocaleDateString('en-US', { weekday: 'long' })}</p>
                  <p><strong>Is Future:</strong> {customDate > currentTime ? 'Yes' : 'No'}</p>
                </div>
              </div>
            )}
          </div>

          {timeDiff && (
            <div className="time-difference">
              <h3>Time Difference</h3>
              <p>
                {timeDiff.days} days, {timeDiff.hours} hours, {timeDiff.minutes} minutes, {timeDiff.seconds} seconds
              </p>
            </div>
          )}
        </section>

        {/* Testing Utilities */}
        <section className="utilities-section">
          <h2>Testing Utilities</h2>
          <div className="utilities-grid">
            <div className="utility-card">
              <h3>Unix Timestamp</h3>
              <p>Current: {Math.floor(currentTime.getTime() / 1000)}</p>
              {customDate && <p>Custom: {Math.floor(customDate.getTime() / 1000)}</p>}
            </div>

            <div className="utility-card">
              <h3>Leap Year</h3>
              <p>Current Year: {(currentTime.getFullYear() % 4 === 0 && currentTime.getFullYear() % 100 !== 0) || currentTime.getFullYear() % 400 === 0 ? 'Yes' : 'No'}</p>
            </div>

            <div className="utility-card">
              <h3>Days in Month</h3>
              <p>Current: {new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 0).getDate()} days</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
