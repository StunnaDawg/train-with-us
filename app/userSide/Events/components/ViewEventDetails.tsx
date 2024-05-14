import { View, Text } from "react-native"
import React from "react"
import ShowMap from "./ShowMap"
import formatBirthdate from "../../../utilFunctions/calculateDOB"
import formatTimestamp from "../../../utilFunctions/formatTimeStamp"

type ViewEventDetailsProps = {
  date: string | null | undefined
}

const ViewEventDetails = ({ date }: ViewEventDetailsProps) => {
  return (
    <View>
      {/* Date and Time */}
      <View className="mb-2">
        <Text className=" font-bold text-lg pb-1">Date and Time:</Text>
        <Text className="font-bold text-lg ">
          {date ? formatTimestamp(date) : "No Date"}
        </Text>
      </View>

      {/* Location */}
      <View className="mb-1">
        <Text className="pb-1 font-bold text-lg ">Location:</Text>
        <Text className="font-bold text-lg ">580 Wright Ave, Dartmouth NS</Text>
      </View>

      <View>
        <ShowMap />
      </View>
    </View>
  )
}

export default ViewEventDetails
