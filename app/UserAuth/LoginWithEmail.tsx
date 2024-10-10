import {
  View,
  Text,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native"
import React, { useState } from "react"
import { TextInput, TouchableOpacity } from "react-native"
import supabase from "../../lib/supabase"
import * as Updates from "expo-updates"
import GenericButton from "../components/GenericButton"
import BackButton from "../components/BackButton"
import showAlert from "../utilFunctions/showAlert"
import { Ionicons } from "@expo/vector-icons"

const LoginWithEmail = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  async function signInWithEmail() {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      showAlert({
        title: "Email or Password is incorrect",
        message: "Please try again",
      })
    }
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
            textContentType="password"
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
            text="Sign in with Email"
            buttonFunction={() => signInWithEmail()}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginWithEmail
