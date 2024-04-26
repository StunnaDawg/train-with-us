import { View, Text, SafeAreaView, ScrollView } from "react-native"
import React from "react"
import EventCheckoutTitle from "./components/EventCheckoutTitle"
import PromoCode from "./components/PromoCode"
import EventAdmissionCheckout from "./components/EventAdmissionCheckout"
import PurchaseFooter from "./components/PurchaseFooter"

const EventCheckout = () => {
  return (
    <View className="flex-1 bg-yellow-300">
      <SafeAreaView className="flex-1">
        <ScrollView>
          <View className="mt-20">
            <EventCheckoutTitle />
          </View>
          <View className="mt-10">
            <PromoCode />
          </View>
          <View className="mt-5">
            <EventAdmissionCheckout />
          </View>
        </ScrollView>
        <View className="absolute inset-x-0 bottom-0 pb-12 bg-white/75">
          <PurchaseFooter />
        </View>
      </SafeAreaView>
    </View>
  )
}

export default EventCheckout
