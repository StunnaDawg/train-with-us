import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import getUserId from "../../supabaseFunctions/getFuncs/getUserId"
import { Database } from "../../@types/supabase"
import JustAdded from "./components/JustAdded"
import Upcoming from "./components/Upcoming"
import AllEvents from "./components/AllEvents"

const Events = () => {
  const [currentUserId, setCurrentUserId] = useState<string>("")
  const [userProfile, setUserProfile] = useState<
    Database["public"]["Tables"]["profiles"]["Row"] | null
  >(null)

  useEffect(() => {
    const setId = async () => {
      await getUserId(setCurrentUserId)
    }
    setId()
  }, [])

  //   useEffect(() => {
  //     const setProfile = async () => {
  //       try {
  //         console.log("trying", currentUserId)
  //         if (currentUserId) {
  //           await useCurrentUser(currentUserId, setUserProfile)
  //         } else {
  //           console.log("no user")
  //         }
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //     setProfile()
  //   }, [currentUserId])

  //   useEffect(() => {
  //     if (userProfile && userProfile) {
  //       console.log("User ID:", userProfile)
  //     } else {
  //       console.log("User profile data is not available.")
  //     }
  //   }, [userProfile])

  return (
    <ScrollView>
      <View>
        <JustAdded />
      </View>

      <View>
        <Upcoming />
      </View>

      <View>
        <AllEvents />
      </View>
    </ScrollView>
  )
}

export default Events
