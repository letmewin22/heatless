export function formatDate(
  date: Date | string | number,
  fullMonth?: boolean
): string {
  const d = new Date(date)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  if (day.length < 2) day = '0' + day

  const monthNamesShort = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const monthNamesFull = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const monthNames = fullMonth ? monthNamesFull : monthNamesShort

  return [day, monthNames[d.getMonth()], year].join(' ')
}
