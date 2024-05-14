import * as Linking from "expo-linking"

const openInAppleMaps = (address: string) => {
  const url = `http://maps.apple.com/?q=${encodeURIComponent(address)}`
  Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err))
}

export default openInAppleMaps
