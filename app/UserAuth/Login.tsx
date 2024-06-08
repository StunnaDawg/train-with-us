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
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import supabase from "../../lib/supabase"
import { NavigationType } from "../@types/navigation"
import { SafeAreaView } from "react-native-safe-area-context"
import AppleAuth from "./AppleAuth"
import * as Updates from "expo-updates"
import GenericButton from "../components/GenericButton"
import AuthLoginImage from "./AuthLoginImage"
import TermsOfService from "./TermsOfService"

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

const Login = () => {
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
              text="Sign in with Email"
              buttonFunction={() => navigation.navigate("LoginWithEmail")}
            />
          </View>

          <View className="flex flex-row justify-center">
            <AppleAuth />
          </View>

          <View className="items-center m-5">
            <Pressable onPress={() => navigation.navigate("SignUp")}>
              <Text className="font-bold text-2xl text-white">
                Don't Have an Account?
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login
