import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import useCurrentUser from "../../hooks/getFuncs/useCurrentUser"
import getUserId from "../../hooks/getFuncs/getUserId"
import { Database } from "../../@types/supabase"

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

  useEffect(() => {
    const setProfile = async () => {
      try {
        console.log("trying", currentUserId)
        if (currentUserId) {
          await useCurrentUser(currentUserId, setUserProfile)
        } else {
          console.log("no user")
        }
      } catch (error) {
        console.log(error)
      }
    }
    setProfile()
  }, [currentUserId])

  useEffect(() => {
    if (userProfile && userProfile) {
      console.log("User ID:", userProfile)
    } else {
      console.log("User profile data is not available.")
    }
  }, [userProfile])

  return (
    <>
      {userProfile !== null && userProfile.id ? (
        <View>
          <Text>
            {currentUserId} {userProfile.id}{" "}
          </Text>
        </View>
      ) : (
        <View>
          <Text>Loading</Text>
        </View>
      )}
    </>
  )
}

export default Events
