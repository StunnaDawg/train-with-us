import { View, Text, ScrollView, Pressable } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import AllEvents from "./components/AllEvents"
import { RefreshControl } from "react-native-gesture-handler"
import EventTypes from "./components/EventTypes"
import Upcoming from "./components/Upcoming"
import { Skeleton } from "moti/skeleton"
import { NavBar } from "../../../components"

const Events = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  return (
    <>
      <NavBar
        title="Events"
        bgColour="bg-primary-900"
        textColour="text-white"
        showFriends={false}
        showSettings={false}
        showSearchCommunities={false}
        searchUsers={false}
      />
      <ScrollView
        className=" bg-primary-900"
        style={{ backgroundColor: "#07182d" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* <View>
          <JustAdded refreshing={refreshing} />
        </View> */}

        <Skeleton>
          <Upcoming refreshing={refreshing} />
        </Skeleton>

        <View>
          <AllEvents />
        </View>

        {/* <View>
          <EventTypes refreshing={refreshing} type="CrossFit" />
        </View>

        <View>
          <EventTypes refreshing={refreshing} type="Yoga" />
        </View> */}

        <View>
          <EventTypes refreshing={refreshing} type="Hyrox" />
        </View>

        {/* <View>
          <EventTypes refreshing={refreshing} type="In-House-Competition" />
        </View> */}
      </ScrollView>

      {/* <UpdateModal /> */}
    </>
  )
}

export default Events
