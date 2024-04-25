import { View, Text } from "react-native"
import React from "react"
import ShowMap from "./ShowMap"

const ViewEventDetails = () => {
  return (
    <View>
      {/* Date and Time */}
      <View className="mb-2">
        <Text className=" font-bold text-lg pb-1">Date and Time:</Text>
        <Text className="font-bold text-lg ">Friday May 10th @ 3pm</Text>
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
