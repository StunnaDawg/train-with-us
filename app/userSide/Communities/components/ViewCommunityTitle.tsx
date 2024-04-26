import { View, Text, Pressable } from "react-native"
import React from "react"
import WhiteSkinnyButton from "../../../components/WhiteSkinnyButton"

const ViewCommunityTitle = () => {
  const requestToJoin = () => {}
  return (
    <View className="mx-12">
      <View className="items-center">
        <Text className="font-bold text-3xl">Blended Athletics</Text>
      </View>

      <View className="flex flex-row justify-between items-center">
        <View>
          <Text className="font-bold text-xl">2233 Members</Text>
        </View>
        <View>
          <WhiteSkinnyButton
            text="+ Request to Join"
            buttonFunction={requestToJoin}
          />
        </View>
      </View>
    </View>
  )
}

export default ViewCommunityTitle
