import { View, Text, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { NavigationType } from "../../../@types/navigation"

const EventAdmissionCheckout = () => {
  const [count, setCount] = useState(0)

  // Function to decrement the count, not going below 0
  const decrementCount = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0))
  }

  // Function to increment the count
  const incrementCount = () => {
    setCount((prev) => prev + 1)
  }
  return (
    <View className=" bg-white/50 mx-12 rounded-xl">
      <View className="items-center">
        <View className="flex flex-row justify-between bg-white border rounded-full px-10 mx-12 py-3 mt-4 items-center ">
          <View>
            <Text className="font-bold">Admission</Text>
          </View>

          <View className="flex flex-row justify-between">
            <Pressable
              onPress={decrementCount}
              className="flex flex-row bg-white border rounded-full px-3 py-1 items-center mx-2"
            >
              <Text>-</Text>
            </Pressable>

            <View>
              <Text className="font-bold text-lg">{count}</Text>
            </View>

            <Pressable
              onPress={incrementCount}
              className="flex flex-row bg-blue-400/90 border rounded-full px-3  py-1 items-center  mx-2"
            >
              <Text>+</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View className="mt-3 mb-2">
        <View>
          <Text className="font-bold text-slate-500/90 text-sm px-12">
            Total: ${10}+ Tax
          </Text>
        </View>

        <View>
          <Text className="font-bold text-slate-500/90 text-sm px-12">
            Sales end May 8th, 2024
          </Text>
        </View>
      </View>
    </View>
  )
}

export default EventAdmissionCheckout