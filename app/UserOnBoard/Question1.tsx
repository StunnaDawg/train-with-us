import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { NavigationType } from "../@types/navigation"
import supabase from "../../lib/supabase"
import { useAuth } from "../supabaseFunctions/authcontext"
import GenericButton from "../components/GenericButton"
import { Ionicons } from "@expo/vector-icons"

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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-between py-10 px-6"
      >
        <View>
          <Text className="font-bold text-3xl text-white mb-8">
            What's your name?
          </Text>

          <View className="mb-6">
            <Text className="text-white text-lg mb-2">First Name</Text>
            <View className="border-b border-gray-400 py-2 flex-row items-center">
              <TextInput
                className="flex-1 text-lg font-semibold text-white"
                placeholder="Required"
                placeholderTextColor="#a0aec0"
                onChangeText={(text) => setFirstName(text)}
                value={first_name}
              />
              {first_name.length > 0 && (
                <TouchableOpacity onPress={() => setFirstName("")}>
                  <Ionicons name="close-circle" size={24} color="#a0aec0" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View>
            <Text className="text-white text-lg mb-2">Last Name</Text>
            <View className="border-b border-gray-400 py-2 flex-row items-center">
              <TextInput
                className="flex-1 text-lg font-semibold text-white"
                placeholder="Optional"
                placeholderTextColor="#a0aec0"
                onChangeText={(text) => setLastName(text)}
                value={last_name}
              />
              {last_name.length > 0 && (
                <TouchableOpacity onPress={() => setLastName("")}>
                  <Ionicons name="close-circle" size={24} color="#a0aec0" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <View className="mb-2">
          <GenericButton
            text="Continue"
            buttonFunction={handleUserUpdate}
            colourDefault="bg-white"
            colourPressed="bg-yellow-300"
            borderColourDefault="border-transparent"
            borderColourPressed="border-yellow-400"
            textSize="text-lg"
            roundness="rounded-full"
            width={200}
            padding="py-4"
            textColour="text-gray-800"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Question1
