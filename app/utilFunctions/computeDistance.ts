import * as Location from "expo-location"

function toRad(angle: number) {
  return (angle * Math.PI) / 180
}

const computeDistance = async (
  userLocationCoords: Location.LocationObject["coords"],
  eventLocationCoords: Location.LocationObject["coords"]
): Promise<number> => {
  const prevLatInRad = toRad(userLocationCoords.latitude)
  const prevLongInRad = toRad(userLocationCoords.longitude)
  const latInRad = toRad(eventLocationCoords.latitude)
  const longInRad = toRad(eventLocationCoords.longitude)

  return (
    6377.830272 *
    Math.acos(
      Math.sin(prevLatInRad) * Math.sin(latInRad) +
        Math.cos(prevLatInRad) *
          Math.cos(latInRad) *
          Math.cos(longInRad - prevLongInRad)
    )
  )
}

export default computeDistance
