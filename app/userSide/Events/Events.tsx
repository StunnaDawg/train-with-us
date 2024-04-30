import { View, Text, ScrollView, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import getUserId from "../../supabaseFunctions/getFuncs/getUserId"
import { Database } from "../../@types/supabase"
import JustAdded from "./components/JustAdded"
import Upcoming from "./components/Upcoming"
import AllEvents from "./components/AllEvents"
import { Profile } from "../../@types/supabaseTypes"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"

const Events = () => {
  const { user } = useAuth()
  const [userProfile, setUserProfile] = useState<Profile | null>(null)
  const navigation = useNavigation<NavigationType>()

  useEffect(() => {
    const getUser = async () => {
      if (!user) return
      await useCurrentUser(user?.id, setUserProfile)
    }
    getUser()
  }, [])

  return (
    <ScrollView>
      <View className="flex flex-row justify-end m-3">
        <Pressable
          onPress={() => {
            if (!userProfile?.community_created) {
              navigation.navigate("CreateCommunity")
            } else {
              navigation.navigate("CreateEvent")
            }
          }}
        >
          <Text className="font-bold text-xl">Create Event +</Text>
        </Pressable>
      </View>
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
