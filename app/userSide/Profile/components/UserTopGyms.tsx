import { View, Text } from "react-native"
import React from "react"
import { Profile } from "../../../@types/supabaseTypes"

type UserTopGymsProps = {
  borderB: boolean
  mt: boolean
  profile: Profile | null
}

const UserTopGyms = ({ borderB, mt, profile }: UserTopGymsProps) => {
  return (
    <View className={mt ? "mt-8 ml-7 mr-7 " : "mt-2 ml-7 mr-7"}>
      <View className="flex flex-row  ">
        <Text className="text-xl font-bold">
          Primary Gym: <Text className="font-semibold">Blended Athletics</Text>
        </Text>
      </View>
      <View className="flex flex-row mt-1">
        <Text className="text-lg font-bold">
          Secondary Gym: <Text className="font-semibold">Shanti Yoga</Text>
        </Text>
      </View>
      <View className={borderB ? "border-b mt-4" : "mt-4"} />
    </View>
  )
}

export default UserTopGyms
