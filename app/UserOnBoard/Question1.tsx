import { View, Text, Pressable, SafeAreaView, TextInput } from "react-native"
import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { NavigationType } from "../@types/navigation"
import NextButton from "../components/NextButton"
import supabase from "../../lib/supabase"
import { useAuth } from "../supabaseFunctions/authcontext"

const Question1 = () => {
  const [first_name, setFirstName] = useState<string>("")
  const [last_name, setLastName] = useState<string>("")
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()

  const handleUserUpdate = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: first_name,
          last_name: last_name,
        })
        .eq("id", user?.id)

      if (error) throw error

      navigation.navigate("QuestionTwo")
    } catch (error) {
      console.log(error)
    }
  }
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
                onChangeText={(text) => setFirstName(text)}
                value={first_name}
              />
            </View>

            <View className="border-b py-2">
              <TextInput
                className="w-full text-xl font-bold px-2"
                placeholder="Last Name"
                onChangeText={(text) => setLastName(text)}
                value={last_name}
              />
            </View>
          </View>
        </View>
        <View className="mt-4 flex flex-row justify-end">
          <NextButton onPress={() => handleUserUpdate()} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Question1
