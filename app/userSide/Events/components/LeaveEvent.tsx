import { View, Text, Pressable } from "react-native"
import React from "react"
import showAlertFunc from "../../../utilFunctions/showAlertFunc"
import supabase from "../../../../lib/supabase"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import showAlert from "../../../utilFunctions/showAlert"

type LeaveEventProps = {
  eventId: number
  userId: string | null | undefined
  isWaitList: boolean
}

const LeaveEvent = ({ eventId, userId, isWaitList }: LeaveEventProps) => {
  const navigation = useNavigation<NavigationType>()
  const [isPressed, setIsPressed] = React.useState<boolean>(false)

  const handleOnPressIn = () => {
    setIsPressed(true)
  }
  const handleOnPressOut = () => {
    setIsPressed(false)
  }

  const leaveEventFunc = async () => {
    if (!userId || !eventId) return
    try {
      if (isWaitList) {
        const { error } = await supabase
          .from("event_waitlist")
          .delete()
          .match({ user_id: userId, event_id: eventId })

        if (error) {
          console.error("Failed to leave event:", error)
          throw error
        }
        showAlert({ title: "Success", message: "WaitList Left" })
      } else {
        const { data, error: promoteError } = await supabase.rpc(
          "promote_next_waitlist_user",
          { p_event_id: eventId }
        )

        if (promoteError) {
          console.error("Failed to promote next waitlist user:", promoteError)
        }

        const { error } = await supabase
          .from("events_users")
          .delete()
          .match({ user_id: userId, event_id: eventId })

        if (error) {
          console.error("Failed to leave event:", error)
          throw error
        }
        showAlert({ title: "Success", message: "Event Left" })
      }
    } catch (error) {
      console.error("Failed to leave event:", error)
      showAlert({ title: "Error", message: "Failed to leave event" })
    } finally {
      navigation.goBack()
    }
  }

  const handleLeaveButton = () => {
    showAlertFunc({
      title: isWaitList
        ? "Are you sure you want to leave waitlist?"
        : "Are you sure you want to leave this event?",
      message: isWaitList
        ? "You can rejoin later, but will lose your spot in the waitlist"
        : "You can rejoin later",
      buttons: [
        {
          text: "Leave",
          onPress: () => leaveEventFunc(),
          style: "destructive",
        },
        {
          text: "No, Stay",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
    })
  }

  return (
    <View className="flex flex-row justify-center">
      <View className="items-center">
        <Pressable
          onPressIn={handleOnPressIn}
          onPressOut={handleOnPressOut}
          onPress={() => {
            handleLeaveButton()
          }}
          className={`${
            isPressed ? "bg-slate-500" : "bg-white"
          } border rounded-lg px-20 my-2 py-2`}
        >
          <Text className="font-bold text-sm">
            {isWaitList ? "Leave WaitList" : "Leave Event"}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default LeaveEvent
