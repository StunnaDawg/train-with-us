import { View, Text, Dimensions } from "react-native"
import React, { useEffect, useState } from "react"
import SinglePic from "../../../components/SinglePic"
import formatBirthdate from "../../../utilFunctions/calculateDOB"
import ShareButton from "../../../components/ShareButton"
import EventCoverPic from "./EventCoverPic"
import { Skeleton } from "moti/skeleton"

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
  const screenWidth = Dimensions.get("window").width - 56
  return (
    <View>
      <View className="flex flex-row justify-center items-center">
        <View>
          <EventCoverPic
            height={200}
            width={375}
            avatarRadius={0}
            noAvatarRadius={0}
            item={eventPhoto}
          />
          <Text className="text-2xl font-bold text-white m-1">
            {title ? title : "No Title"}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default ViewEventTitle
