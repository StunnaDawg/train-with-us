import React, { createContext, useState, useContext, useEffect } from "react"
import * as Location from "expo-location"

// Define types
type LocationContextType = {
  location: Location.LocationObject | null
  fetchLocation: () => Promise<Location.LocationObject | null>
  setLocation: React.Dispatch<
    React.SetStateAction<Location.LocationObject | null>
  >
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

  useEffect(() => {
    ;(async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== "granted") {
          console.log("Permission to access location was denied")
          return
        }

        let currentLocation = await Location.getCurrentPositionAsync({})
        console.log("Initial location fetch:", currentLocation)
        setLocation(currentLocation)
      } catch (error) {
        console.error("Error fetching initial location:", error)
      }
    })()
  }, [])

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
      setLocation(currentLocation)
      return currentLocation
    } catch (error) {
      console.error("Error fetching location:", error)
      return null
    }
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
