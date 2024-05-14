import * as Linking from "expo-linking"

const openInGoogleMaps = (address: string) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`
  Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err))
}

export default openInGoogleMaps
