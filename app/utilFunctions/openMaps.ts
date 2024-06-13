import * as Linking from "expo-linking"

import { Alert } from "react-native"

const openInMaps = (address: string) => {
  // Define the URLs for both map services
  const appleUrl = `http://maps.apple.com/?q=${encodeURIComponent(address)}`
  const googleUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`

  // Show an alert with options
  Alert.alert(
    "Open in Maps",
    "Choose a map application to open:",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Open in Apple Maps",
        onPress: () => openURL(appleUrl, "Apple Maps"),
      },
      {
        text: "Open in Google Maps",
        onPress: () => openURL(googleUrl, "Google Maps"),
      },
    ],
    { cancelable: true }
  )
}

const openURL = (url: string, appName: string) => {
  Linking.openURL(url).catch((err) =>
    console.error(`Failed to open ${appName} URL:`, err)
  )
}

export default openInMaps
