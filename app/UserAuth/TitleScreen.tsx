import { View, Text, SafeAreaView, Pressable, AppState } from "react-native"
import React from "react"
import AuthLoginImage from "./AuthLoginImage"
import TermsOfService from "./TermsOfService"
import GenericButton from "../components/GenericButton"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"
import supabase from "../../lib/supabase"

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

const TitleScreen = () => {
  const navigation = useNavigation<NavigationType>()
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#07182d" }}>
      <View className="flex-1 justify-center items-center">
        <AuthLoginImage />
        <View className="mt-12">
          <TermsOfService />
        </View>
        <View className="flex flex-row justify-center my-2">
          <GenericButton
            colourDefault="bg-white"
            colourPressed="bg-slate-400"
            borderColourPressed="black"
            borderColourDefault="black"
            roundness="rounded-xl"
            textSize="text-lg"
            textCenter={true}
            text="Create an Account"
            width={250}
            buttonFunction={() => {
              navigation.navigate("SignUp")
            }}
          />
        </View>
        <View className="flex flex-row justify-center">
          <Pressable
            onPress={() => {
              navigation.navigate("Login")
            }}
          >
            <Text className="text-white text-lg font-extrabold">Sign in</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default TitleScreen
