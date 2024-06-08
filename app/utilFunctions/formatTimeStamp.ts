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

export default formatTimestamp
