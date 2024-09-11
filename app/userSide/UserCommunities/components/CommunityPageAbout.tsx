import { View, Text, Platform, Pressable, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { Communities, Profile } from "../../../@types/supabaseTypes"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import { FontAwesome6 } from "@expo/vector-icons"
import { ImageBackground } from "expo-image"
import openInGoogleMaps from "../../../utilFunctions/openGoogleMaps"
import openInMaps from "../../../utilFunctions/openMaps"
import ActivityTags from "../../../components/AcvitivityTags"

type CommunityPageAboutProps = {
  community: Communities
}

const CommunityPageAbout = ({ community }: CommunityPageAboutProps) => {
  const [isPressed, setIsPressed] = useState<{ [key: string]: boolean }>({})

  const handlePressIn = (name: string) => {
    setIsPressed((prev) => ({ ...prev, [name]: true }))
  }

  const handlePressOut = (name: string) => {
    setIsPressed((prev) => ({ ...prev, [name]: false }))
  }

  return (
    <View className="flex-1 bg-primary-900">
      <View className="m-2 mx-4">
        <SinglePicCommunity
          noAvatarRadius={25}
          allowExpand={false}
          allowCacheImage={false}
          size={100}
          skeletonRadius={25}
          avatarRadius={25}
          item={community.community_profile_pic}
        />
        <Text className="font-bold text-2xl text-white">
          {community.community_title}
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          className="mt-1"
        >
          {community.community_tags && community.community_tags.length > 0
            ? community.community_tags.map((tag) => (
                <View key={tag} className="mb-1">
                  <ActivityTags activity={`${tag}`} />
                </View>
              ))
            : null}
        </ScrollView>
        <View className="m-2">
          <Text className="font-semibold text-white">{community.about}</Text>
        </View>
      </View>

      <View className="mx-5 my-1">
        {community.address ? (
          Platform.OS === "ios" ? (
            <Pressable
              className={`${isPressed["location"] ? "opacity-50" : null}`}
              onPressIn={() => handlePressIn("location")}
              onPressOut={() => handlePressOut("location")}
              onPress={() => {
                if (community.address) {
                  openInMaps(community.address)
                }
              }}
            >
              <View className=" mb-2 mt-2">
                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center">
                    <FontAwesome6
                      name="location-arrow"
                      size={20}
                      color="white"
                    />
                    <Text className="font-bold text-sm text-white mx-1 ">
                      {/* {String.fromCodePoint("&#128205")}{" "} */}
                      {community.address
                        ? community.address
                        : "No Street Address"}
                    </Text>
                  </View>

                  <FontAwesome6 name="chevron-right" size={20} color="white" />
                </View>
              </View>
            </Pressable>
          ) : (
            <Pressable
              className={`${
                isPressed["locationAndroid"] ? "opacity-50" : null
              }`}
              onPressIn={() => handlePressIn("locationAndroid")}
              onPressOut={() => handlePressOut("locationAndroid")}
              onPress={() => {
                if (community.address) {
                  openInGoogleMaps(community.address)
                }
              }}
            >
              <View className=" mb-1 mt-2">
                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center">
                    <FontAwesome6
                      name="location-arrow"
                      size={20}
                      color="white"
                    />
                    <Text className="font-bold text-sm text-white mx-1 ">
                      {/* {String.fromCodePoint("&#128205")}{" "} */}
                      {community.address
                        ? community.address
                        : "No Street Address"}
                    </Text>
                  </View>

                  <FontAwesome6 name="chevron-right" size={20} color="white" />
                </View>
              </View>
            </Pressable>
          )
        ) : null}
      </View>
    </View>
  )
}

export default CommunityPageAbout
