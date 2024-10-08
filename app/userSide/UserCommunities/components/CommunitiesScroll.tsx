import { View, ScrollView, Pressable, Text } from "react-native"
import React, { useCallback } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import { Communities } from "../../../@types/supabaseTypes"
import CommunityBubble from "./CommunityBubble"
import { FontAwesome6 } from "@expo/vector-icons"
import { useAuth } from "../../../supabaseFunctions/authcontext"

type CommunitiesScrollProps = {
  communities: Communities[] | null
}

const CommunitiesScroll = ({ communities }: CommunitiesScrollProps) => {
  const { userProfile } = useAuth()
  const navigation = useNavigation<NavigationType>()

  const renderCommunities = useCallback(() => {
    return communities?.map((community) => (
      <CommunityBubble
        key={community.id}
        community={community}
        userId={userProfile?.id}
      />
    ))
  }, [communities, userProfile?.id])

  return (
    <View className="bg-primary-800 rounded-lg shadow-md p-4 mb-4">
      <Text className="text-white text-lg font-semibold mb-3">
        Your Communities
      </Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="flex-row"
      >
        {!userProfile?.community_created && (
          <Pressable
            onPress={() => navigation.navigate("CreateCommunity")}
            className="mr-4 items-center justify-center"
          >
            <View className="w-16 h-16 rounded-full bg-primary-600 items-center justify-center mb-2">
              <FontAwesome6 name="circle-plus" size={32} color="white" />
            </View>
            <Text className="text-white text-xs text-center">Create New</Text>
          </Pressable>
        )}
        {renderCommunities()}
      </ScrollView>
    </View>
  )
}

export default CommunitiesScroll
