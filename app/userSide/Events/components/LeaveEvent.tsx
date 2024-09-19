import { View, Text, Pressable } from "react-native"
import React from "react"
import showAlertFunc from "../../../utilFunctions/showAlertFunc"
import supabase from "../../../../lib/supabase"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import showAlert from "../../../utilFunctions/showAlert"
import { FunctionsHttpError } from "@supabase/supabase-js"

type LeaveEventProps = {
  eventId: number
  userId: string | null | undefined
  isWaitList: boolean
  setIsWaitList: React.Dispatch<React.SetStateAction<boolean>>
}

const sendNotification = async (
  token: string,
  title: string,
  body: string,
  eventId: number
) => {
  console.log("Sending notification to", token)
  const { data, error } = await supabase.functions.invoke("push", {
    body: {
      token,
      titleWords: title,
      bodyWords: body,
      data: { eventId, type: "waitlist_promoted" },
    },
  })

  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json()
    console.log("Function returned an error", errorMessage)
  }

  console.log("Notification sent:", data)
}

const LeaveEvent = ({
  eventId,
  userId,
  isWaitList,
  setIsWaitList,
}: LeaveEventProps) => {
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
        setIsWaitList(false)
        showAlert({ title: "Success", message: "WaitList Left" })
      } else {
        console.log("Attempting Promoting next waitlist user")

        const { data: promoteData, error: promoteError } = await supabase.rpc(
          "promote_next_waitlist_user",
          { p_event_id: eventId }
        )

        if (promoteError) {
          console.error("Failed to promote next waitlist user:", promoteError)
          // Handle the error as needed
        }

        if (promoteData && promoteData.length > 0) {
          const promotedUserId = promoteData[0]
          // Use the promotedUserId as needed
          console.log("Promoted user ID:", promotedUserId)
          // For example, send a notification to the promoted user
        } else {
          console.log("No user was on the waitlist to promote.")
        }

        const { error } = await supabase
          .from("events_users")
          .delete()
          .match({ user_id: userId, event_id: eventId })

        if (error) {
          console.error("Failed to leave event:", error)
          throw error
        }
        navigation.goBack()
        showAlert({ title: "Success", message: "Event Left" })
      }
    } catch (error) {
      console.error("Failed to leave event:", error)
      showAlert({ title: "Error", message: "Failed to leave event" })
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
