import { View, Text, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { NavigationType } from "../../../@types/navigation"
import { Events } from "../../../@types/supabaseTypes"

type CheckoutProps = {
  ticketPrice: number
  event: Events | null
}

const Checkout = ({ ticketPrice, event }: CheckoutProps) => {
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
        <View className="flex flex-row justify-between bg-white border rounded-full px-20 mx-12 py-3 mt-4 items-center ">
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
        <Pressable
          onPress={() => {
            console.log("trying")
            console.log(event)
            if (!event) return
            navigation.navigate("EventCheckout", {
              event: event,
              ticketNumber: count,
              ticketPrice: 9,
            })
            console.log("Checkout")
          }}
          className=" bg-blue-400/90 border rounded-full px-32 my-2 py-2"
        >
          <Text className="font-bold">Checkout</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Checkout
