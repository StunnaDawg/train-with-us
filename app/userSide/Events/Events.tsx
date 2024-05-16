import { View, Text, ScrollView, Pressable } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
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
import { RefreshControl } from "react-native-gesture-handler"

const Events = () => {
  const { user } = useAuth()
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [userProfile, setUserProfile] = useState<Profile | null>(null)
  const navigation = useNavigation<NavigationType>()

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  useEffect(() => {
    const getUser = async () => {
      if (!user) return
      await useCurrentUser(user?.id, setUserProfile)
    }
    getUser()
  }, [])

  useEffect(() => {
    const getUser = async () => {
      if (!user) return
      await useCurrentUser(user?.id, setUserProfile)
    }
    getUser()
  }, [refreshing])

  return (
    <ScrollView
      className=" bg-primary-900"
      style={{ backgroundColor: "#07182d" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* <View className="flex flex-row justify-end m-3">
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
      </View> */}
      <View>
        <JustAdded refreshing={refreshing} />
      </View>

      <View>
        <Upcoming refreshing={refreshing} />
      </View>

      <View>
        <AllEvents refreshing={refreshing} />
      </View>
    </ScrollView>
  )
}

export default Events
