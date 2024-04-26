import { View, Text, TextInput, Pressable } from "react-native"
import React from "react"

const PromoCode = () => {
  return (
    <View className="flex flex-col">
      <View className=" mx-24 items-start">
        <Text className="font-bold text-lg  text-slate-500/95 ">PromoCode</Text>
      </View>

      <View className="flex flex-row justify-between p-4 mx-16 border border-slate-500/95  rounded-2xl items-center">
        <View>
          <TextInput placeholder="Enter Code" />
        </View>

        <Pressable className="text-center">
          <Text className=" text-slate-500/95 text-center text-sm">Apply</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default PromoCode
