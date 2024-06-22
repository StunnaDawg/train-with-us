import { View, Text, Alert, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import GenericButton from "../../../components/GenericButton"
import { Profile } from "../../../@types/supabaseTypes"
import requestToJoin from "../../../supabaseFunctions/addFuncs/requestToJoin"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"

type ViewCommunityTitleProps = {
  communityId: number
  communityTitle: string | undefined | null
}

const JoinFooter = ({
  communityId,
  communityTitle,
}: ViewCommunityTitleProps) => {
  const [requestSent, setRequestSent] = useState<boolean>(false)
  const [isPressed, setIsPressed] = useState(false)
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null)
  const { user } = useAuth()
  const title = `${communityTitle || ""}`

  const handleOnPressIn = () => {
    setIsPressed(true)
  }

  const handleOnPressOut = () => {
    setIsPressed(false)
  }

  const showAlert = (title: string, message: string) =>
    Alert.alert(title, message, [{ text: "OK" }])

  const showErrorAlert = () =>
    Alert.alert(
      "User not Authenticated",
      "Please Check your Connection and try again. Or Check for any missing information.",
      [{ text: "OK" }]
    )

  const requestFunc = async () => {
    if (user?.id === undefined || !currentProfile?.first_name) {
      showErrorAlert()
      return
    }

    await requestToJoin(
      communityId,
      title,
      user?.id,
      currentProfile?.first_name,
      currentProfile?.expo_push_token,
      showAlert
    )

    setRequestSent(true)
  }

  useEffect(() => {
    if (!user) return
    useCurrentUser(user?.id, setCurrentProfile)
  }, [user])

  return (
    <View className=" bg-primary-900 h-12">
      <View className="flex flex-row justify-center items-center h-full">
        <Pressable
          style={{ width: "80%", height: "100%" }}
          className={`${
            isPressed
              ? `bg-slate-400 border-2 border-solid border-slate-400`
              : `bg-white border-2 border-solid border-slate-400`
          } flex justify-center items-center rounded-xl`}
          onPress={() => requestFunc()}
          onPressIn={handleOnPressIn}
          onPressOut={handleOnPressOut}
        >
          <Text className="font-bold text-center text-xl">{`${
            requestSent ? "Request Sent" : "Join"
          }`}</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default JoinFooter
