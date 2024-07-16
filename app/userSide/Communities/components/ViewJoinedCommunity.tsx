import { View, Text, Alert, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import GenericButton from "../../../components/GenericButton"
import { Communities, Profile } from "../../../@types/supabaseTypes"
import requestToJoin from "../../../supabaseFunctions/addFuncs/requestToJoin"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"

type ViewCommunityTitleProps = {
  community: Communities | null
}

const ViewJoinedCommunityFooter = ({ community }: ViewCommunityTitleProps) => {
  const [requestSent, setRequestSent] = useState<boolean>(false)
  const [isPressed, setIsPressed] = useState(false)
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null)
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()

  const handleOnPressIn = () => {
    setIsPressed(true)
  }

  const handleOnPressOut = () => {
    setIsPressed(false)
  }

  const showErrorAlert = () =>
    Alert.alert(
      "Error fetching Community",
      "Please Check your Connection and try again",
      [{ text: "OK" }]
    )

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
          onPress={() => {
            if (community) {
              navigation.navigate("CommunityPage", {
                community: community,
              })
            } else {
              showErrorAlert()
            }
          }}
          onPressIn={handleOnPressIn}
          onPressOut={handleOnPressOut}
        >
          <Text className="font-bold text-center text-xl">View Community</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default ViewJoinedCommunityFooter
