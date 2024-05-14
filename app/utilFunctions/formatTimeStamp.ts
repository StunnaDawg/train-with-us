const formatTimestamp = (timestampInput: string | number | null): string => {
  if (!timestampInput) return ""
  const timestamp = new Date(timestampInput)

  // Use toLocaleString to format the date and time in a more detailed manner
  return timestamp.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

// Example usage:
const timestamp = new Date("1990-01-01T15:45:30").getTime() // Convert a date-time string to a timestamp
console.log(formatTimestamp(timestamp)) // Outputs: January 1, 1990, 3:45:30 PM

const dateTimeString = "1990-01-01T15:45:30" // Direct date-time string
console.log(formatTimestamp(dateTimeString))

export default formatTimestamp
