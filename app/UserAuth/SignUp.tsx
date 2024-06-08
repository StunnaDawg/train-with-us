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
import AuthLoginImage from "./AuthLoginImage"
import TermsOfService from "./TermsOfService"

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
  const navigation = useNavigation<NavigationType>()

  return (
    <SafeAreaView className="flex-1 " style={{ backgroundColor: "#07182d" }}>
      <View className="flex-1 justify-center items-center">
        <View>
          <AuthLoginImage />

          <View className="mt-1 mx-2">
            <TermsOfService />
          </View>

          <View className="flex flex-row justify-center m-5">
            <GenericButton
              colourPressed="bg-yellow-300"
              borderColourPressed="border-yellow-300"
              borderColourDefault="border-black"
              colourDefault="bg-white"
              textSize="text-2xl"
              width={300}
              roundness="rounded-xl"
              text="Sign Up with Email"
              buttonFunction={() => navigation.navigate("SignUpWithEmail")}
            />
          </View>

          <View className="flex flex-row justify-center">
            <AppleAuth />
          </View>

          <View className="items-center m-5">
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text className="font-bold text-2xl text-white">
                Already have an Account?
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SignUp
