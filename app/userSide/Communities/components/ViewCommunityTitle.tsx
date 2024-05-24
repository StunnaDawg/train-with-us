import { View, Text, Pressable, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import WhiteSkinnyButton from "../../../components/WhiteSkinnyButton"
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

  const showAlert = () =>
    Alert.alert(
      "Request Sent",
      "The Community Owner will review your request",
      [{ text: "OK" }]
    )

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

    await requestToJoin(communityId, user?.id, currentProfile?.first_name)
    showAlert()
    setRequestSent(true)
  }
  useEffect(() => {
    if (!user) return
    useCurrentUser(user?.id, setCurrentProfile)
  }, [])

  return (
    <View>
      <View className="ml-12">
        <Text className="font-bold text-4xl text-white">
          {community?.community_title}
        </Text>
        <Pressable
          className="flex flex-row items-center"
          onPress={() =>
            navigation.navigate("ViewCommunitiesMembersScreen", {
              communityId: communityId,
            })
          }
        >
          <Text className="mr-1 font-bold text-2xl text-white">
            {community?.community_members?.length} Members
          </Text>
          <FontAwesome6 name="people-group" size={24} color="white" />
        </Pressable>

        <View>
          <GenericButton
            text={requestSent ? `Request Sent ` : `+ Request to Join`}
            buttonFunction={() => requestFunc()}
            roundness="rounded-full"
            textSize="text-xl"
            width={200}
            colourPressed="bg-slate-200"
            colourDefault="bg-white"
            borderColourPressed="border-gray-200"
            borderColourDefault="border-black"
          />
        </View>
      </View>
    </View>
  )
}

export default ViewCommunityTitle
