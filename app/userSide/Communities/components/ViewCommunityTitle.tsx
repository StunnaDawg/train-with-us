import { View, Text, Pressable, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import { Communities, Profile } from "../../../@types/supabaseTypes"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import requestToJoin from "../../../supabaseFunctions/addFuncs/requestToJoin"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import GenericButton from "../../../components/GenericButton"
import { FontAwesome6 } from "@expo/vector-icons"

type ViewCommunityTitleProps = {
  community: Communities | null
  communityId: number
}

const ViewCommunityTitle = ({
  community,
  communityId,
}: ViewCommunityTitleProps) => {
  const [requestSent, setRequestSent] = useState<boolean>(false)
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null)
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()

  const showAlert = (title: string, message: string) =>
    Alert.alert(title, message, [{ text: "OK" }])

  const showErrorAlert = () =>
    Alert.alert(
      "User not Authenticated",
      "Please Check your Connection and try again. Or Check for any missing information.",
      [{ text: "OK" }]
    )

  const requestFunc = async () => {
    console.log("user?.id", user?.id)
    if (user?.id === undefined || !currentProfile?.first_name) {
      showErrorAlert()
      return
    }

    await requestToJoin(
      communityId,
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
  }, [])

  return (
    <View>
      <View className="mx-2">
        <Text className="font-bold text-xl text-white">
          {community?.community_title}
        </Text>

        <View className="flex flex-row justify-between">
          <Pressable
            className="flex flex-row items-center"
            onPress={() =>
              navigation.navigate("ViewCommunitiesMembersScreen", {
                communityId: communityId,
              })
            }
          >
            <Text className="mr-1 font-bold text-lg text-white">
              {community?.member_count} Members
            </Text>
            <FontAwesome6 name="people-group" size={24} color="white" />
          </Pressable>
          <View>
            <GenericButton
              text={requestSent ? `Request Sent ` : `+ Request to Join`}
              buttonFunction={() => requestFunc()}
              roundness="rounded-lg"
              textSize="text-xs"
              width={150}
              colourPressed="bg-slate-200"
              colourDefault="bg-white"
              borderColourPressed="border-gray-200"
              borderColourDefault="border-black"
              fontbold={"font-bold"}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default ViewCommunityTitle
