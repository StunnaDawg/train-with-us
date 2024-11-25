import { View, Text, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { NavigationType } from "../../../@types/navigation"
import { Events, Profile } from "../../../@types/supabaseTypes"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import addEventUser from "../../../supabaseFunctions/addFuncs/addEventUser"
import showAlertFunc from "../../../utilFunctions/showAlertFunc"
import supabase from "../../../../lib/supabase"
import showAlert from "../../../utilFunctions/showAlert"

type CheckoutProps = {
  ticketPrice: number
  event: Events | null
  eventProfiles: Profile[] | null
}

const Checkout = ({ ticketPrice, event, eventProfiles }: CheckoutProps) => {
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const [eventHostState, setEventHost] = useState<Profile | null>({} as Profile)
  const [isWaitList, setIsWaitList] = useState<boolean>(false)
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()
  const [isPressed, setIsPressed] = useState<boolean>(false)

  const handleOnPressIn = () => {
    setIsPressed(true)
  }
  const handleOnPressOut = () => {
    setIsPressed(false)
  }

  const addUserToWaitlist = async () => {
    if (!event || !user) {
      showAlertFunc({
        title: "Error",
        message: "Please check your connection and try again.",
      })
      return
    }

    try {
      if (event?.event_limit) {
        const { data, error } = await supabase
          .from("events_users")
          .select("*")
          .eq("event_id", event.id)
        if (error) throw error

        if (data.length < event.event_limit) {
          showAlert({
            title: "Event Spot Available",
            message: "You have been added to the event",
          })
          await addEventUser(
            event?.id,
            eventHostState?.expo_push_token,
            currentUser?.expo_push_token,
            user?.id,
            currentUser?.first_name || "",
            currentUser?.last_name || "",
            true,
            event?.event_chat
          )
          navigation.goBack()
          return
        }
      }

      const { error } = await supabase.from("event_waitlist").insert([
        {
          event_id: event.id,
          user_id: user.id,
          first_name: currentUser?.first_name || "",
          last_name: currentUser?.last_name || "",
        },
      ])

      if (error) {
        showAlert({
          title: "Error",
          message: error.message,
        })
        return
      }

      showAlert({
        title: "Success",
        message:
          "You have been added to the waitlist, you will be automatically promoted and notified if a spot opens up.",
      })
    } catch (error) {
      showAlert({
        title: "Error",
        message: "Unexpected error",
      })
    } finally {
      setIsWaitList(true)
    }
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

  const waitlistAlert = () => {
    showAlertFunc({
      title: "Join Waitlist",
      message: `Would you like to join the waitlist for ${event?.event_title}?`,
      buttons: [
        { text: "Join Waitlist", onPress: () => addUserToWaitlist() },
        { text: "Cancel" },
      ],
    })
  }

  const handleCheckout = async () => {
    if (!event || !user) {
      showAlertFunc({
        title: "Error",
        message: "Please check your connection and try again.",
      })
      return
    }

    if (event?.event_limit) {
      const { data, error } = await supabase
        .from("events_users")
        .select("*")
        .eq("event_id", event.id)
      if (error) throw error

      if (data.length >= event.event_limit) {
        showAlert({
          title: "Event Full",
          message: "You have been added to the waitlist",
        })
        navigation.goBack()
        return
      }
    }

    await addEventUser(
      event?.id,
      eventHostState?.expo_push_token,
      currentUser?.expo_push_token,
      user?.id,
      currentUser?.first_name || "",
      currentUser?.last_name || "",
      false,
      event?.event_chat
    )

    navigation.navigate("PurchaseScreen")
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
    <View className="flex flex-row justify-between bg-primary-300 rounded-lg p-6">
      <View>
        <View className="flex flex-row items-center">
          <Text className="text-[10px] font-semibold text-white/80">Price</Text>
        </View>
        <View className="flex flex-row items-center">
          <Text className="text-white/80 text-xl font-semibold">
            {ticketPrice ? "$" + ticketPrice : "Free"}
          </Text>
        </View>
      </View>
      <View className="flex flex-row items-center">
        <Pressable
          className="mx-1 bg-yellow-200 rounded-lg px-2 py-2"
          onPressIn={handleOnPressIn}
          onPressOut={handleOnPressOut}
          onPress={() => {
            alert()
          }}
        >
          <Text className="font-semibold text-xs text-yellow-600">
            Interested
          </Text>
        </Pressable>
        <Pressable
          className="mx-1 bg-blue-600 rounded-lg px-2 py-2"
          onPressIn={handleOnPressIn}
          onPressOut={handleOnPressOut}
          onPress={() => {
            alert()
          }}
        >
          <Text className="font-semibold text-xs text-white/80">
            Register Now
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Checkout
