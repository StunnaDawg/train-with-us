import { View, ScrollView, SafeAreaView } from "react-native"
import React from "react"
import ViewEventTitle from "./components/ViewEventTitle"
import ViewEventDetails from "./components/ViewEventDetails"
import AboutViewEvent from "./components/AboutViewEvent"
import Checkout from "./components/Checkout"

const ViewEvent = () => {
  return (
    <>
      <SafeAreaView className=" bg-yellow-300 flex-1">
        <ScrollView>
          <View>
            <ViewEventTitle />
          </View>

          <View className="mx-5 mt-2">
            <ViewEventDetails />
          </View>

          <View>
            <AboutViewEvent />
          </View>
        </ScrollView>
        <View className="flex-1 bg-white/75">
          <Checkout />
        </View>
      </SafeAreaView>
    </>
  )
}

export default ViewEvent
