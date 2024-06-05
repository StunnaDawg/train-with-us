import { View, Text, ScrollView, Pressable } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import JustAdded from "./components/JustAdded"
import Upcoming from "./components/Upcoming"
import AllEvents from "./components/AllEvents"
import { Profile } from "../../@types/supabaseTypes"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import { RefreshControl } from "react-native-gesture-handler"
import EventTypes from "./components/EventTypes"

const Events = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

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

      {/* <View>
        <Upcoming refreshing={refreshing} />
      </View> */}

      <View>
        <AllEvents refreshing={refreshing} />
      </View>

      <View>
        <EventTypes refreshing={refreshing} type="CrossFit" />
      </View>

      <View>
        <EventTypes refreshing={refreshing} type="Yoga" />
      </View>

      <View>
        <EventTypes refreshing={refreshing} type="Hyrox" />
      </View>

      <View>
        <EventTypes refreshing={refreshing} type="In-House-Competition" />
      </View>
    </ScrollView>
  )
}

export default Events
