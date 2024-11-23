import { View, Text, Dimensions } from "react-native"
import React, { useEffect, useState } from "react"
import Ionicons from "@expo/vector-icons/Ionicons"
import SinglePicCommunity from "../../../components/SinglePicCommunity"

type ViewEventTitleProps = {
  title: string | null | undefined
}

const ViewEventTitle = ({ title }: ViewEventTitleProps) => {
  return (
    <View>
      <View className=" my-5">
        <View className="flex flex-row items-center my-1">
          <Text className="text-white text-[10px] font-bold">Organized by</Text>
        </View>

        <View className="flex flex-row items-center">
          <SinglePicCommunity
            size={45}
            avatarRadius={100}
            noAvatarRadius={100}
            item={""}
          />
          <View>
            <Text className="text-white text-sm font-bold">
              Blended Athletics
            </Text>
            <Text className="text-white text-[10px] underline">
              Your Primary Location
            </Text>
          </View>
        </View>
      </View>

      <View className=" mb-10">
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
