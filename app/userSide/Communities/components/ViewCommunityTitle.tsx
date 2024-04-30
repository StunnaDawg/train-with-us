import { View, Text, Pressable } from "react-native"
import React from "react"
import WhiteSkinnyButton from "../../../components/WhiteSkinnyButton"
import { Communities } from "../../../@types/supabaseTypes"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"

type ViewCommunityTitleProps = {
  community: Communities | null
  communityId: number
}

const ViewCommunityTitle = ({
  community,
  communityId,
}: ViewCommunityTitleProps) => {
  const navigation = useNavigation<NavigationType>()
  const requestToJoin = () => {}
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
            text="+ Request to Join"
            buttonFunction={requestToJoin}
          />
        </View>
      </View>
    </View>
  )
}

export default ViewCommunityTitle
