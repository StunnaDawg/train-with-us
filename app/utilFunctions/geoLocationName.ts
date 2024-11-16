import * as Location from "expo-location"

export async function geoLocationName(
  latitude: number | null | undefined,
  longitude: number | null | undefined
): Promise<string> {
  try {
    if (latitude && longitude) {
      const [result] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      })

      if (!result) return "Unknown Location"

      if (result.city && result.region) {
        return `${result.city}, ${result.region}`
      } else if (result.city && !result.region) {
        return result.city
      } else if (!result.city && result.region) {
        return result.region
      } else {
        return "Unknown Location"
      }
    } else {
      return "Unknown Location"
    }
  } catch (error) {
    console.error("Error getting Location name", error)
    return "Unknown Location"
  }
}
