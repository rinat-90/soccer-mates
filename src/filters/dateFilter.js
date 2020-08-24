export default function (value, format = 'date') {
  const options = {}
  if (format.includes('date')) {
    options.weekday = 'long'
    options.day = '2-digit'
    options.month = 'long'
    options.timeZone = 'America/Chicago'
  }
  if (format.includes('time')) {
    options.hour = '2-digit'
    options.minute = '2-digit'
  }
  if (format.includes('month')) {
    options.month = 'short'
  }
  if (format.includes('day')) {
    options.day = 'numeric'
  }

  return new Intl.DateTimeFormat('en-US', options).format(new Date(value))
}
