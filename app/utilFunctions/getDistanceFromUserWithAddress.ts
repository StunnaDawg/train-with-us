import * as Location from "expo-location"
import parsePostGISPoint from "./parsePostGISPoint"
import computeDistance from "./computeDistance"

const getDistanceFromUserWithAddress = async (
  userLocation: any,
  eventLocation: string
): Promise<number> => {
  let userLocationCoords: Location.LocationObject["coords"] | null = null
  let eventLocationCoords: Location.LocationObject["coords"] | null = null

  const parsed = await parsePostGISPoint(userLocation)
  if (parsed) {
    userLocationCoords = {
      latitude: parsed.latitude,
      longitude: parsed.longitude,
      altitude: null,
      accuracy: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    }
  }

  const eventCoords = await Location.geocodeAsync(eventLocation)
  if (eventCoords) {
    eventLocationCoords = {
      latitude: eventCoords[0].latitude,
      longitude: eventCoords[0].longitude,
      altitude: null,
      accuracy: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    }
  }
  if (!userLocationCoords || !eventLocationCoords) {
    return 0
  } else {
    const distance = await computeDistance(
      userLocationCoords,
      eventLocationCoords
    )

    return distance
  }
}

export default getDistanceFromUserWithAddress
