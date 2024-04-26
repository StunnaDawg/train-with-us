import { View, Text, Pressable } from "react-native"
import React, { useState } from "react"

const PurchaseFooter = () => {
  return (
    <View className="flex flex-row justify-center items-center">
      <View>
        <View className=" flex flex-row justify-between bg-white border rounded-xl py-3 mt-4  ">
          <View className="px-6">
            <Text className="font-bold">Total</Text>
          </View>

          <View>
            <View className="px-6">
              <Text className="font-bold ">CA 11.50</Text>
            </View>
          </View>
        </View>
        <Pressable className=" bg-blue-400/90 border rounded-full px-32 my-2 py-2">
          <Text className="font-bold">Checkout</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default PurchaseFooter
