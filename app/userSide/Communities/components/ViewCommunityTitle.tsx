import { View, Text, Pressable, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import WhiteSkinnyButton from "../../../components/WhiteSkinnyButton"
import { Communities, Profile } from "../../../@types/supabaseTypes"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import requestToJoin from "../../../supabaseFunctions/addFuncs/requestToJoin"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"

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
  useEffect(() => {
    if (!user) return
    useCurrentUser(user?.id, setCurrentProfile)
  }, [])

  return (
    <View className="mx-12">
      <View className="items-center">
        <Text className="font-bold text-3xl">{community?.community_title}</Text>
      </View>

      <View className="flex flex-row justify-between items-center">
        <Pressable
          onPress={() =>
            navigation.navigate("ViewCommunitiesMembersScreen", {
              communityId: communityId,
            })
          }
        >
          <Text className="font-bold text-xl">
            {community?.community_members?.length} Members
          </Text>
        </Pressable>
        <View>
          <WhiteSkinnyButton
            text={requestSent ? `Request Sent ` : `+ Request to Join`}
            buttonFunction={async () => {
              console.log("user?.id", user?.id)
              if (user?.id === undefined || !currentProfile?.first_name) {
                showErrorAlert()
                return
              }

              await requestToJoin(
                communityId,
                user?.id,
                currentProfile?.first_name
              )
              showAlert()
              setRequestSent(true)
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default ViewCommunityTitle
