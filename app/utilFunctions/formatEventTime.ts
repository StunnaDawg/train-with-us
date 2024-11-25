const formatEventTime = (date: string | number | null) => {
  if (!date) return ""
  const eventDate = new Date(date)
  const eventTime = eventDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
  return eventTime
}

export default formatEventTime
