import { View, Text, Pressable, SafeAreaView, TextInput } from "react-native"
import { useNavigation } from "@react-navigation/native"
import React from "react"
import { NavigationType } from "../@types/navigation"
import NextButton from "../components/NextButton"

const Question1 = () => {
  const navigation = useNavigation<NavigationType>()
  return (
    <SafeAreaView className="flex-1">
      <View className="flex justify-center mx-12">
        <View className="items-start w-full">
          <View className="my-5">
            <Text className="font-bold text-2xl">What's Your Name?</Text>
          </View>

          <View className="w-full">
            <View className="border-b py-2">
              <TextInput
                className="w-full text-xl font-bold px-2"
                placeholder="First Name (Required)"
              />
            </View>

            <View className="border-b py-2">
              <TextInput
                className="w-full text-xl font-bold px-2"
                placeholder="Last Name"
              />
            </View>
          </View>
        </View>
        <View className="mt-4 flex flex-row justify-end">
          <NextButton onPress={() => navigation.navigate("QuestionTwo")} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Question1
