import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native"
import React, { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import BackButton from "../components/BackButton"
import GenericButton from "../components/GenericButton"
import supabase from "../../lib/supabase"
import * as Updates from "expo-updates"
import showAlert from "../utilFunctions/showAlert"

const SignUpWithEmail = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  async function signUpWithEmail() {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      showAlert({
        title: "There was an error signing up",
        message: error.message,
      })
      Alert.alert(error.message)
    }
    if (!session) Alert.alert("Please check your inbox for email verification!")

    await Updates.reloadAsync()
  }
  return (
    <SafeAreaView className="flex-1 " style={{ backgroundColor: "#07182d" }}>
      <View className="mx-2">
        <BackButton colour="white" size={32} />
      </View>
      <KeyboardAvoidingView
        className="flex-1 justify-center "
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View className="border-b border-gray-400 py-2 mx-4 mb-4">
          <TextInput
            placeholderTextColor={"#a0aec0"}
            className="w-full text-lg font-bold px-2 text-white"
            onChangeText={(text: string) => setEmail(text)}
            value={email}
            placeholder="Email"
            autoCapitalize={"none"}
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
            onSubmitEditing={() => {
              Keyboard.dismiss()
            }}
          />
        </View>
        <View className="border-b border-gray-400 py-2 mx-4 mb-4 flex-row items-center">
          <TextInput
            placeholderTextColor={"#a0aec0"}
            className="flex-1 text-lg font-bold px-2 text-white"
            onChangeText={(text: string) => setPassword(text)}
            value={password}
            secureTextEntry={!showPassword}
            placeholder="Password"
            autoCapitalize={"none"}
            textContentType="newPassword"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <View className="flex flex-row justify-center m-5">
          <GenericButton
            colourPressed="bg-yellow-300"
            borderColourPressed="border-yellow-300"
            borderColourDefault="border-black"
            colourDefault="bg-white"
            textSize="text-lg"
            width={200}
            roundness="rounded-xl"
            text="Sign Up with Email"
            buttonFunction={() => signUpWithEmail()}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignUpWithEmail
