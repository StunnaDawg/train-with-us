import { View, Text, Pressable, Platform, TouchableOpacity } from "react-native"
import React from "react"
import { Communities } from "../../../@types/supabaseTypes"
import { ScrollView } from "react-native-gesture-handler"
import ActivityTags from "../../../components/AcvitivityTags"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import openInMaps from "../../../utilFunctions/openMaps"
import openInGoogleMaps from "../../../utilFunctions/openGoogleMaps"
import { FontAwesome6 } from "@expo/vector-icons"

type CommunityAboutProps = {
  community: Communities | null
}

const CommunityAbout = ({ community }: CommunityAboutProps) => {
  return (
    <View className="p-4">
      <View className="flex-row items-center mb-4">
        {community?.community_profile_pic && (
          <SinglePicCommunity
            noAvatarRadius={25}
            allowExpand={false}
            allowCacheImage={false}
            size={80}
            skeletonRadius={25}
            avatarRadius={25}
            item={community?.community_profile_pic}
          />
        )}
        <View className="ml-4 flex-1">
          <Text className="font-bold text-2xl text-white mb-2">
            {community?.community_title}
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="flex-row"
          >
            {community?.community_tags && community?.community_tags.length > 0
              ? community?.community_tags.map((tag) => (
                  <View key={tag} className="mr-2">
                    <ActivityTags activity={`${tag}`} />
                  </View>
                ))
              : null}
          </ScrollView>
        </View>
      </View>

      <View className="bg-gray-800 rounded-lg p-4 mb-4">
        <Text className="font-semibold text-white text-base leading-6">
          {community?.about || "No description"}
        </Text>
      </View>

      {community?.address && (
        <TouchableOpacity
          className="bg-gray-800 rounded-lg p-4 flex-row justify-between items-center"
          onPress={() => {
            if (Platform.OS === "ios") {
              openInMaps(community?.address || "")
            } else {
              openInGoogleMaps(community?.address || "")
            }
          }}
        >
          <View className="flex-row items-center">
            <FontAwesome6 name="location-dot" size={20} color="#3B82F6" />
            <Text className="font-semibold text-white text-base ml-3">
              {community.address}
            </Text>
          </View>
          <FontAwesome6 name="chevron-right" size={16} color="#9CA3AF" />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default CommunityAbout
