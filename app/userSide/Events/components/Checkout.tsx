import { View, Text, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { NavigationType } from "../../../@types/navigation"

const Checkout = () => {
  const [count, setCount] = useState(0)

  // Function to decrement the count, not going below 0
  const decrementCount = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0))
  }

  // Function to increment the count
  const incrementCount = () => {
    setCount((prev) => prev + 1)
  }
  const navigation = useNavigation<NavigationType>()
  return (
    <View className="flex flex-row justify-center">
      <View className="items-center">
        <View className="flex flex-row justify-between bg-white border rounded-full px-36 py-3 mt-4 items-center ">
          <Text className="font-bold">Admission</Text>

          <View className="flex flex-row">
            <Pressable
              onPress={decrementCount}
              className="flex flex-row bg-white border rounded-full px-3 py-1 items-center "
            >
              <Text>-</Text>
            </Pressable>

            <View>
              <Text className="font-bold text-xl">{count}</Text>
            </View>

            <Pressable
              onPress={incrementCount}
              className="flex flex-row bg-blue-400/90 border rounded-full px-3  py-1 items-center "
            >
              <Text>+</Text>
            </Pressable>
          </View>
        </View>
        <Pressable
          onPress={() => navigation.navigate("EventCheckout")}
          className=" bg-blue-400/90 border rounded-full px-36 my-2 py-1"
        >
          <Text className="font-bold">Checkout</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Checkout
