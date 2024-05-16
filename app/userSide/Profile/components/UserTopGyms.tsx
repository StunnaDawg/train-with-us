import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"

type UserTopGymsProps = {
  borderB: boolean
  mt: boolean
  communityName: string
}

const UserTopGyms = ({ borderB, mt, communityName }: UserTopGymsProps) => {
  return (
    <View className={mt ? "mt-8 ml-7 mr-7 " : "mt-2 ml-7 mr-7"}>
      <View className="flex flex-row  ">
        {communityName !== "No Primary gym" ? (
          <Text className="text-xl font-bold">
            Primary Gym: <Text className="font-semibold">{communityName}</Text>
          </Text>
        ) : null}
      </View>
      <View className={borderB ? "border-b mt-4" : "mt-4"} />
    </View>
  )
}

export default UserTopGyms
