import { View, Text } from "react-native"
import React from "react"
import formatBirthdate from "../../../utilFunctions/calculateDOB"

type ViewEventTitleProps = {
  title: string | null | undefined
  date: string | null | undefined
  eventCommunityTitle: string | null | undefined
  eventStyle: string | null | undefined
}

const EventCheckoutTitle = ({
  date,
  title,
  eventCommunityTitle,
  eventStyle,
}: ViewEventTitleProps) => {
  return (
    <View className="flex flex-row justify-center">
      <View className="items-center ">
        <Text className="font-bold text-lg text-white">
          {date ? formatBirthdate(date) : "No Date"}
        </Text>
        <View className="rounded-full border-white px-5 my-1 bg-white">
          <Text
            className="font-bold text-lg
          "
          >
            {title ? title : "No Title"}
          </Text>
        </View>
        <Text
          className="font-bold text-white text-lg
          "
        >
          {eventStyle ? eventStyle : null}
        </Text>
        <Text className="font-bold text-lg text-white">
          Community Host:{" "}
          {eventCommunityTitle
            ? eventCommunityTitle
            : "Error Loading Community Name"}
        </Text>
      </View>
    </View>
  )
}

export default EventCheckoutTitle
