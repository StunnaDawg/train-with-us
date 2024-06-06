import { View, Text, Pressable } from "react-native"
import React from "react"

const TermsOfService = () => {
  return (
    <View className="flex flex-row justify-center items-center ">
      <Text className="font-medium  text-md text-slate-400 text-center">
        By tapping 'Sign in'/ 'Create an Account' you agree to our{" "}
        <Pressable>
          <Text className="text-blue-400 underline text-center">
            TERMS of SERVICE
          </Text>
        </Pressable>
        . Learn how we process your data in our{" "}
        <Pressable>
          <Text className="text-blue-400 underline text-center">
            PRIVACY POLICY
          </Text>
        </Pressable>
        .
      </Text>
    </View>
  )
}

export default TermsOfService
