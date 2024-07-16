import { View, Text, Pressable } from "react-native"
import React from "react"
import showAlertFunc from "../../../utilFunctions/showAlertFunc"
import supabase from "../../../../lib/supabase"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import showAlert from "../../../utilFunctions/showAlert"

type LeaveEventProps = { eventId: number; userId: string | null | undefined }

const LeaveEvent = ({ eventId, userId }: LeaveEventProps) => {
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

  const handleLeaveButton = () => {
    showAlertFunc({
      title: "Are you sure you want to leave this event?",
      message: "You can rejoin later",
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
          <Text className="font-bold text-sm">Leave Event</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default LeaveEvent
