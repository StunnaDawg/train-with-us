import { View, Text, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { NavigationType } from "../../../@types/navigation"
import { Events, Profile } from "../../../@types/supabaseTypes"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import addEventUser from "../../../supabaseFunctions/addFuncs/addEventUser"
import showAlertFunc from "../../../utilFunctions/showAlertFunc"

type CheckoutProps = {
  ticketPrice: number
  event: Events | null
}

const Checkout = ({ ticketPrice, event }: CheckoutProps) => {
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const [eventHostState, setEventHost] = useState<Profile | null>({} as Profile)
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()
  const [isPressed, setIsPressed] = useState<boolean>(false)

  const handleOnPressIn = () => {
    setIsPressed(true)
  }
  const handleOnPressOut = () => {
    setIsPressed(false)
  }

  const alert = () => {
    showAlertFunc({
      title: "Join Event",
      message: `Would you like to RVSP ${event?.event_title}?`,
      buttons: [
        { text: "RVSP", onPress: () => handleCheckout() },
        { text: "Cancel" },
      ],
    })
  }

  const handleCheckout = async () => {
    if (!event || !user || !currentUser?.first_name || !currentUser?.last_name)
      return

    if (ticketPrice === 0) {
      await addEventUser(
        event?.id,
        eventHostState?.expo_push_token,
        user?.id,
        currentUser?.first_name,
        currentUser?.last_name
      )
      navigation.navigate("PurchaseScreen")
    } else {
      navigation.navigate("EventCheckout", {
        event: event,
        ticketPrice: ticketPrice,
      })
    }
  }

  useEffect(() => {
    if (!user) return
    useCurrentUser(user?.id, setCurrentUser)
  }, [user])

  useEffect(() => {
    if (!event?.event_host) return
    useCurrentUser(event.event_host, setEventHost)
  }, [event?.event_host])

  return (
    <View className="flex flex-row justify-center">
      <View className="items-center">
        <Pressable
          onPressIn={handleOnPressIn}
          onPressOut={handleOnPressOut}
          onPress={() => {
            alert()
          }}
          className={` ${
            isPressed ? "bg-slate-500" : "bg-white"
          } border rounded-lg px-20 my-2 py-2`}
        >
          <Text className="font-bold text-sm">
            {ticketPrice > 0 ? "Purchase Ticket" : "RVSP for Event"}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Checkout
