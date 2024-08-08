import { View, Text, Pressable, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import { Communities } from "../../../@types/supabaseTypes"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import CommunityContact from "./CommunityContact"
import BackButton from "../../../components/BackButton"

type ViewCommunityTitleProps = {
  community: Communities | null
  communityId: number
  userId: string | undefined | null
}

const ViewCommunityTitle = ({
  community,
  communityId,
  userId,
}: ViewCommunityTitleProps) => {
  const navigation = useNavigation<NavigationType>()

  return (
    <View>
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center">
          <View className="ml-1">
            <BackButton colour="white" size={28} />
          </View>

          <View className="flex-1 items-center">
            <Text className="text-white text-xl font-bold  text-center flex-wrap">
              {community?.community_title
                ? community.community_title
                : "Community"}
            </Text>
            <Pressable
              className="flex flex-row items-center"
              onPress={() =>
                navigation.navigate("ViewCommunitiesMembersScreen", {
                  communityId: communityId,
                })
              }
            >
              <Text className="font-bold text-xs text-slate-500">
                {community?.member_count} Members
              </Text>
            </Pressable>
          </View>
        </View>
        <View>
          <CommunityContact community={community} userId={userId} />
        </View>
      </View>
    </View>
  )
}

export default ViewCommunityTitle
