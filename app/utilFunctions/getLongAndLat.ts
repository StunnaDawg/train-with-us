import * as Location from "expo-location"

export const getLongAndLat = async (
  location: string,
  setEventCoords: (coords: Location.LocationObject["coords"] | null) => void
): Promise<Location.LocationObject["coords"] | null> => {
  const eventCoords = await Location.geocodeAsync(location)
  if (eventCoords) {
    setEventCoords({
      latitude: eventCoords[0].latitude,
      longitude: eventCoords[0].longitude,
      altitude: null,
      accuracy: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    })
    return {
      latitude: eventCoords[0].latitude,
      longitude: eventCoords[0].longitude,
      altitude: null,
      accuracy: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    }
  }
  return null
}
