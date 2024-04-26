import { View, ScrollView, SafeAreaView } from "react-native"
import React from "react"
import ViewEventTitle from "./components/ViewEventTitle"
import ViewEventDetails from "./components/ViewEventDetails"
import AboutViewEvent from "./components/AboutViewEvent"
import Checkout from "./components/Checkout"

const ViewEvent = () => {
  return (
    <View className="flex-1 bg-yellow-300">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1">
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
        <View className="absolute inset-x-0 bottom-0 pb-12 bg-white/75">
          <Checkout />
        </View>
      </SafeAreaView>
    </View>
  )
}

export default ViewEvent
