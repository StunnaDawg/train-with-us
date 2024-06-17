import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import SinglePic from "../../../components/SinglePic"
import formatBirthdate from "../../../utilFunctions/calculateDOB"
import ShareButton from "../../../components/ShareButton"

type ViewEventTitleProps = {
  userId: string | null | undefined
  title: string | null | undefined
  date: string | null | undefined
  eventId: number | null | undefined
  eventPhoto: string | null | undefined
  eventCommunityTitle: string | null | undefined
  eventStyle: string | null | undefined
}

const ViewEventTitle = ({
  userId,
  title,
  date,
  eventId,
  eventPhoto,
  eventCommunityTitle,
  eventStyle,
}: ViewEventTitleProps) => {
  return (
    <View className="flex flex-row items-center justify-center">
      <View className="m-5  items-center">
        <View className="flex flex-row justify-center">
          <Text className="text-lg font-bold text-white mx-1">
            {title ? title : "No Title"}
          </Text>
          <ShareButton eventId={eventId} userId={userId} />
        </View>
        <Text className="text-lg font-bold text-white">
          {date ? formatBirthdate(date) : "No Date"}
        </Text>
        <View className="border rounded-full mt-1 p-1 px-4 bg-white border-white">
          <Text className="text-sm font-semibold">
            {eventCommunityTitle ? eventCommunityTitle : "Error Loading Title"}
          </Text>
        </View>
        <Text className="font-bold text-white mt-2">
          {eventStyle ? eventStyle : null}
        </Text>
      </View>

      <View className="border-white rounded-lg border-4">
        <SinglePic
          size={125}
          avatarRadius={0}
          noAvatarRadius={0}
          item={eventPhoto}
        />
      </View>
    </View>
  )
}

export default ViewEventTitle
