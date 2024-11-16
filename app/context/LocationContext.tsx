import React, { createContext, useState, useContext, useEffect } from "react"
import * as Location from "expo-location"
import supabase from "../../lib/supabase"
import { useAuth } from "../supabaseFunctions/authcontext"

// Define types
type LocationContextType = {
  location: Location.LocationObject | null
  fetchLocation: () => Promise<Location.LocationObject | null>
  setLocation: React.Dispatch<
    React.SetStateAction<Location.LocationObject | null>
  >
}

const parsePostGISPoint = async (
  pointString: any
): Promise<{ latitude: number; longitude: number } | null> => {
  if (!pointString) {
    console.log("didn't work")
    return null
  }

  try {
    // Use Supabase function to convert WKB to text
    const { data, error } = await supabase.rpc("st_astext", {
      wkb: pointString,
    })

    if (error) throw error

    // Now parse the POINT format
    const matches = data.match(/POINT\(([-\d.]+) ([-\d.]+)\)/)
    if (!matches) return null

    return {
      latitude: parseFloat(matches[2]),
      longitude: parseFloat(matches[1]),
    }
  } catch (error) {
    console.error("Error parsing location:", error)
    return null
  }
}

// Create the context with type
const LocationContext = createContext<LocationContextType | undefined>(
  undefined
)

// Context Provider Component
export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [initialized, setInitialized] = useState(false)
  const { user, userProfile } = useAuth()

  useEffect(() => {
    const initializeLocation = async () => {
      if (!initialized && userProfile) {
        if (userProfile.location) {
          console.log("trying to parse coords")
          const coords = await parsePostGISPoint(userProfile.location)
          if (coords) {
            console.log("there are coords", coords.latitude, coords.longitude)

            const locationObject: Location.LocationObject = {
              coords: {
                latitude: coords.latitude,
                longitude: coords.longitude,
                altitude: null,
                accuracy: null,
                altitudeAccuracy: null,
                heading: null,
                speed: null,
              },
              timestamp: userProfile?.last_location_update
                ? new Date(userProfile.last_location_update).getTime()
                : Date.now(),
            }
            setLocation(locationObject)
            console.log("no need to fetch location")
          } else {
            await fetchLocation()
          }
        } else {
          await fetchLocation()
        }
        setInitialized(true)
      }
    }
    initializeLocation()
  }, [userProfile, initialized])

  const updateSupabaseLocation = async (
    newLocation: Location.LocationObject
  ) => {
    if (!user?.id) {
      console.log("No user ID available for location update")
      return
    }

    let oldCoords = location?.coords
    if (!oldCoords && userProfile?.location) {
      const parsed = await parsePostGISPoint(userProfile.location)
      if (parsed) {
        oldCoords = {
          latitude: parsed.latitude,
          longitude: parsed.longitude,
          altitude: null,
          accuracy: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        }
      }
    }

    const oldLocation = oldCoords
      ? {
          coords: oldCoords,
          timestamp: Date.now(),
        }
      : null

    if (!isLocationSignificantlyDifferent(newLocation, oldLocation)) {
      console.log("not big enough difference")
      return
    }

    try {
      const pointString = `POINT(${newLocation.coords.longitude.toString()} ${newLocation.coords.latitude.toString()})`

      const { data, error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          location: pointString,
          last_location_update: new Date().toISOString(),
        })
        .select()

      if (data) {
        console.log(data)
      }
      if (error) throw error
      console.log("Location updated in Supabase")
    } catch (error) {
      console.error("Error updating location in Supabase:", error)
    }
  }

  const fetchLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        console.log("Permission to access location was denied")
        return null
      }

      let currentLocation = await Location.getCurrentPositionAsync({})

      await updateSupabaseLocation(currentLocation)

      if (currentLocation) {
        setLocation(currentLocation)
      }

      return currentLocation
    } catch (error) {
      console.error("Error fetching location:", error)
      return null
    }
  }

  const isLocationSignificantlyDifferent = (
    newLocation: Location.LocationObject,
    oldLocation: any,
    threshold: number = 0.01
  ): boolean => {
    console.log("isLocationSignificantlyDifferent checking:", {
      newLocation: newLocation?.coords,
      oldLocation: oldLocation?.coords || "null",
      userProfileLocation: userProfile?.location || "null",
    })

    if (!oldLocation?.coords && !userProfile?.location) {
      console.log("No previous location data available")
      return true
    }

    let oldCoords = oldLocation?.coords

    if (!oldCoords && userProfile?.location) {
      console.log("trying to parse", userProfile.location)
      const parsed = parsePostGISPoint(userProfile.location)
      if (!parsed) {
        console.log("Failed to parse userProfile location")
        return true
      }
      oldCoords = parsed
    }

    // If we still don't have old coordinates, consider it different
    if (!oldCoords) {
      console.log("No old coordinates available after parsing")
      return true
    }

    const latDiff = Math.abs(newLocation.coords.latitude - oldCoords.latitude)
    const lngDiff = Math.abs(newLocation.coords.longitude - oldCoords.longitude)

    console.log("Location difference:", {
      latDiff,
      lngDiff,
      threshold,
      isDifferent: latDiff > threshold || lngDiff > threshold,
    })

    return latDiff > threshold || lngDiff > threshold
  }

  return (
    <LocationContext.Provider
      value={{
        location,
        fetchLocation,
        setLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

// Custom hook to use the location context
export const useLocationContext = (): LocationContextType => {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error("useLocationContext must be used within a LocationProvider")
  }
  return context
}
