import { View, Text, SafeAreaView, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import EventCheckoutTitle from "./components/EventCheckoutTitle"
import PromoCode from "./components/PromoCode"
import EventAdmissionCheckout from "./components/EventAdmissionCheckout"
import PurchaseFooter from "./components/PurchaseFooter"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../../@types/navigation"

const EventCheckout = () => {
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [ticketNumberState, setTicketNumberState] = useState<number>(0)
  const route = useRoute<RouteProp<RootStackParamList, "EventCheckout">>()
  const ticketNumber = route.params.ticketNumber
  const ticketPrice = route.params.ticketPrice
  const event = route.params.event

  useEffect(() => {
    setTicketNumberState(ticketNumber)
  }, [ticketNumber])

  useEffect(() => {
    setTotalAmount(ticketNumberState * ticketPrice)
  }, [ticketNumberState])
  return (
    <View className="flex-1" style={{ backgroundColor: "#07182d" }}>
      <SafeAreaView className="flex-1">
        <ScrollView>
          <View className="mt-20">
            <EventCheckoutTitle
              title={event.event_title}
              eventCommunityTitle={event.community_host_name}
              eventStyle={event.event_style}
              date={event.date}
            />
          </View>
          <View className="mt-10">
            <PromoCode />
          </View>
          <View className="mt-5">
            <EventAdmissionCheckout
              firstAmountTickets={ticketNumber}
              tickets={ticketNumberState}
              setTickets={setTicketNumberState}
              date={event.date}
            />
          </View>
        </ScrollView>
        <View className="absolute inset-x-0 bottom-0 pb-12 bg-white/75">
          <PurchaseFooter
            eventHost={event.event_host}
            ticketNumber={ticketNumberState}
            eventId={event.id}
            total={totalAmount}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}

export default EventCheckout
