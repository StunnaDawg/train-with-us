const formatBirthdate = (timestampInput: string | number | null): string => {
  if (!timestampInput) return ""
  const birthdate = new Date(timestampInput)

  // Use toLocaleDateString to format the date in the "month day, year" format
  return birthdate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Example usage:
const timestamp = new Date("1990-01-01").getTime() // Convert a date string to a timestamp
console.log(formatBirthdate(timestamp)) // Outputs: January 1, 1990

const dateString = "1990-01-01" // Direct date string
console.log(formatBirthdate(dateString)) // Outputs: January 1, 1990

export default formatBirthdate
