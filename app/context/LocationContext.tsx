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

const parsePostGISPoint = (
  pointString: any
): { latitude: number; longitude: number } | null => {
  if (!pointString) return null

  // POINT(longitude latitude) -> extract numbers
  const matches = pointString.match(/POINT\(([-\d.]+) ([-\d.]+)\)/)
  if (!matches) return null

  // matches[1] is longitude, matches[2] is latitude
  return {
    latitude: parseFloat(matches[2]),
    longitude: parseFloat(matches[1]),
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
  const { user, userProfile } = useAuth()

  useEffect(() => {
    if (userProfile?.location) {
      const coords = parsePostGISPoint(userProfile.location)
      if (coords) {
        // Create a Location.LocationObject from the coordinates
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
        console.log("Set initial location from userProfile:", locationObject)
      }
    }
  }, [userProfile?.location])

  // useEffect(() => {
  //   if (user?.id) {
  //     ;(async () => {
  //       try {
  //         let { status } = await Location.requestForegroundPermissionsAsync()
  //         if (status !== "granted") {
  //           console.log("Permission to access location was denied")
  //           return
  //         }

  //         let currentLocation = await Location.getCurrentPositionAsync({})

  //         await updateSupabaseLocation(currentLocation)

  //         setLocation(currentLocation)
  //       } catch (error) {
  //         console.error("Error fetching initial location:", error)
  //       }
  //     })()
  //   }
  // }, [user?.id])

  useEffect(() => {
    fetchLocation()
  }, [])

  const updateSupabaseLocation = async (
    newLocation: Location.LocationObject
  ) => {
    if (!user?.id) {
      console.log("No user ID available for location update")
      return
    }

    if (!isLocationSignificantlyDifferent(newLocation, location)) {
      console.log("not big enough difference")
      return
    }

    try {
      console.log("trying to update location for user", user.id)
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

  // Function to get current location
  const fetchLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        console.log("Permission to access location was denied")
        return null
      }

      let currentLocation = await Location.getCurrentPositionAsync({})
      console.log("current Location", currentLocation)

      await updateSupabaseLocation(currentLocation)

      setLocation(currentLocation)
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
    let oldCoords

    if (typeof oldLocation === "string") {
      const parsed = parsePostGISPoint(oldLocation)
      if (!parsed) return true
      oldCoords = parsed
    } else {
      oldCoords = oldLocation.coords
    }

    return (
      Math.abs(newLocation.coords.latitude - oldCoords.latitude) > threshold ||
      Math.abs(newLocation.coords.longitude - oldCoords.longitude) > threshold
    )
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
