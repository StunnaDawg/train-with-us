import { View, Text, Dimensions } from "react-native"
import React, { useEffect, useState } from "react"
import Ionicons from "@expo/vector-icons/Ionicons"
import SinglePicCommunity from "../../../components/SinglePicCommunity"
import { Communities, Events } from "../../../@types/supabaseTypes"
import EventCoverPic from "./EventCoverPic"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
type ViewEventTitleProps = {
  title: string | null | undefined
  communityHost: Communities | null
  event: Events | null
}

const ViewEventTitle = ({
  title,
  communityHost,
  event,
}: ViewEventTitleProps) => {
  const screenWidth = Dimensions.get("window").width
  return (
    <View>
      <View className="flex flex-row justify-center items-center">
        <View className="flex flex-row justify-center items-center absolute top-0 z-10 bg-black/50 w-full p-3">
          <FontAwesome5 name="fire-alt" size={20} color="green" />
          <Text className="text-green-400 text-sm font-bold mx-1">98%</Text>
        </View>
        <EventCoverPic
          height={300}
          width={screenWidth}
          item={event?.event_cover_photo}
          avatarRadius={0}
          noAvatarRadius={0}
        />
      </View>

      <View className=" my-5 px-2">
        <View className="flex flex-row items-center my-1">
          <Text className="text-white text-[10px] font-bold">Organized by</Text>
        </View>

        <View className="flex flex-row items-center">
          <View className="">
            <SinglePicCommunity
              size={45}
              avatarRadius={100}
              noAvatarRadius={100}
              item={communityHost?.community_profile_pic}
            />
          </View>
          <View className="ml-2">
            <Text className="text-white text-sm font-bold">
              {communityHost?.community_title}
            </Text>
            <Text className="text-white text-[10px] underline">
              Your Primary Location
            </Text>
          </View>
        </View>
      </View>

      <View className=" mb-10 px-2">
        <View className="flex flex-row items-center">
          <Ionicons name="rocket-outline" size={20} color="white" />
          <Text className="text-white text-[10px]">Single Day Event</Text>
        </View>
        <Text className="text-4xl font-medium text-white m-1">
          {title ? title : "No Title"}
        </Text>
      </View>
    </View>
  )
}

export default ViewEventTitle
