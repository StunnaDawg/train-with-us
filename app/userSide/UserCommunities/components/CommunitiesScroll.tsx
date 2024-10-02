import { View, ScrollView, Pressable, Text } from "react-native"
import React, { useState, useCallback, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import { Communities, Profile } from "../../../@types/supabaseTypes"
import CommunityBubble from "./CommunityBubble"
import { FontAwesome6 } from "@expo/vector-icons"
import { useLoading } from "../../../context/LoadingContext"
import { useAuth } from "../../../supabaseFunctions/authcontext"

type CommunitiesScrollProps = {
  communities: Communities[] | null
}

const CommunitiesScroll = ({ communities }: CommunitiesScrollProps) => {
  const { userProfile } = useAuth()
  const navigation = useNavigation<NavigationType>()

  const renderCommunities = useCallback(() => {
    return communities?.map((community) => {
      return (
        <CommunityBubble
          key={community.id}
          community={community}
          userId={userProfile?.id}
        />
      )
    })
  }, [communities])

  return (
    <View className="max-h-full  border-slate-400">
      <ScrollView horizontal={true}>
        <View className="flex flex-row items-center">
          {!userProfile?.community_created && (
            <Pressable
              onPress={() => navigation.navigate("CreateCommunity")}
              className="m-2"
            >
              <FontAwesome6 name="circle-plus" size={64} color="white" />
            </Pressable>
          )}

          {renderCommunities()}
        </View>
      </ScrollView>
    </View>
  )
}

export default CommunitiesScroll
