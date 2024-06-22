import { View, Text, Pressable, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import addEventUser from "../../../supabaseFunctions/addFuncs/addEventUser"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import { Profile } from "../../../@types/supabaseTypes"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"

type PurchaseFooterProps = {
  eventHost: string
  total: number
  ticketNumber: number
  eventId: number
}

const PurchaseFooter = ({
  total,
  eventId,
  ticketNumber,
  eventHost,
}: PurchaseFooterProps) => {
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const [eventHostState, setEventHost] = useState<Profile | null>({} as Profile)
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()

  const showAlert = () =>
    Alert.alert(
      "No Ticket!",
      "Please add a ticket to purchase",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    )

  useEffect(() => {
    if (!user) return
    useCurrentUser(user?.id, setCurrentUser)
  }, [user])

  useEffect(() => {
    if (!eventHost) return
    useCurrentUser(eventHost, setEventHost)
  }, [eventHost])
  return (
    <View className="flex flex-row justify-center items-center">
      <View>
        <View className=" flex flex-row justify-between bg-white border rounded-xl py-3 mt-4  ">
          <View className="px-6">
            <Text className="font-bold">Total</Text>
          </View>

          <View>
            <View className="px-6">
              <Text className="font-bold ">CA {total}</Text>
            </View>
          </View>
        </View>
        <Pressable
          onPress={async () => {
            console.log(
              "trying",
              user?.id,
              currentUser?.first_name,
              currentUser?.last_name
            )
            if (
              !user ||
              !currentUser?.first_name ||
              !currentUser?.last_name ||
              ticketNumber === 0
            ) {
              showAlert()
              return
            }

            await addEventUser(
              eventId,
              eventHostState?.expo_push_token,
              user?.id,
              currentUser?.first_name,
              currentUser?.last_name
            )
            navigation.navigate("PurchaseScreen")
          }}
          className=" bg-blue-400/90 border rounded-full px-32 my-2 py-2"
        >
          <Text className="font-bold">Purchase</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default PurchaseFooter
