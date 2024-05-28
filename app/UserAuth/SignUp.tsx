import React, { useState } from "react"
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  TextInput,
  Button,
  Pressable,
  Text,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native"
import supabase from "../../lib/supabase"
import { NavigationType } from "../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import AppleAuth from "./AppleAuth"
import GoogleAuth from "./GoogleAuth"
import * as Updates from "expo-updates"
import GenericButton from "../components/GenericButton"

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation<NavigationType>()

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert("Please check your inbox for email verification!")
    setLoading(false)
    await Updates.reloadAsync()
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#07182d" }}>
      <KeyboardAvoidingView className="flex flex-row justify-center">
        <View className="flex-1 mx-10">
          <View className="items-center">
            <Image
              source={require("./TWU-Logo.png")}
              style={{ width: 300, height: 300 }}
            />
            <Text className="font-bold text-3xl text-white">Train With Us</Text>
            <Text className="font-semibold text-xl text-white">
              Beyond Fitness
            </Text>
          </View>
          <View className="border-b py-2">
            <TextInput
              placeholderTextColor={"white"}
              className="w-full text-xl font-bold px-2 text-white"
              onChangeText={(text: string) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={"none"}
            />
          </View>
          <View className="border-b py-2">
            <TextInput
              placeholderTextColor={"white"}
              className="w-full text-xl font-bold px-2 text-white"
              onChangeText={(text: string) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={"none"}
            />
          </View>
          <View className="flex flex-row justify-center m-5">
            <GenericButton
              colourPressed="bg-yellow-300"
              borderColourPressed="border-yellow-300"
              borderColourDefault="border-black"
              colourDefault="bg-white"
              textSize="text-xl"
              width={250}
              roundness="round-none"
              text="Sign Up"
              buttonFunction={() => signUpWithEmail()}
            />
          </View>
          <View>
            <AppleAuth />
          </View>
          <View className="items-center m-5">
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text className="font-bold text-white text-2xl">
                Already Have An Account?
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignUp
