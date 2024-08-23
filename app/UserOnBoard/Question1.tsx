import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { NavigationType } from "../@types/navigation"
import NextButton from "../components/NextButton"
import supabase from "../../lib/supabase"
import { useAuth } from "../supabaseFunctions/authcontext"
import GenericButton from "../components/GenericButton"

const Question1 = () => {
  const [first_name, setFirstName] = useState<string>("")
  const [last_name, setLastName] = useState<string>("")
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()

  const showAlert = () =>
    Alert.alert(
      "Missing Information",
      "Please enter your First Name.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    )

  const showAuthError = () =>
    Alert.alert(
      "Authentication Error",
      "Please try again or restart the app.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    )
  const handleUserUpdate = async () => {
    if (first_name === "") {
      showAlert()
      return
    }

    if (user === null) {
      showAuthError()
      return
    }
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: first_name,
          last_name: last_name,
        })
        .eq("id", user?.id)

      if (error) throw error

      navigation.navigate("Notifications")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex-1 justify-center mx-8">
        <View className="items-start w-full">
          <View className="mt-5">
            <Text className="font-bold text-xl text-white">
              What's your name?
            </Text>
          </View>

          <View className="w-full">
            <View className="border py-2 rounded-lg bg-white my-2">
              <TextInput
                className="w-full text-lg font-bold px-2"
                placeholder="First Name (Required)"
                onChangeText={(text) => setFirstName(text)}
                value={first_name}
              />
            </View>

            <View className="border py-2 rounded-lg bg-white">
              <TextInput
                className="w-full  text-lg font-bold px-2"
                placeholder="Last Name"
                onChangeText={(text) => setLastName(text)}
                value={last_name}
              />
            </View>
          </View>
        </View>
      </View>
      <View className="flex flex-row justify-center m-4">
        <GenericButton
          text="Continue"
          buttonFunction={() => handleUserUpdate()}
          colourDefault="bg-white"
          colourPressed="bg-yellow-300"
          borderColourDefault="border-black"
          borderColourPressed="border-black"
          textSize="text-lg"
          roundness="rounded-lg"
          width={300}
          padding="p-2"
        />
      </View>
    </SafeAreaView>
  )
}

export default Question1
