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
} from "react-native"
import supabase from "../../lib/supabase"
import { NavigationType } from "../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import AppleAuth from "./AppleAuth"
import GoogleAuth from "./GoogleAuth"

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
  }

  return (
    <SafeAreaView className="flex-1 bg-yellow-300">
      <View className="flex flex-row justify-center">
        <View className="flex-1 mx-10">
          <View className="items-center">
            <Image
              source={require("./TWU-Logo.png")}
              style={{ width: 300, height: 300 }}
            />
            <Text className="font-bold text-3xl">Train With Us</Text>
            <Text className="font-semibold text-xl">Beyond Fitness</Text>
          </View>
          <View className="border-b py-2">
            <TextInput
              className="w-full text-xl font-bold px-2"
              onChangeText={(text: string) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={"none"}
            />
          </View>
          <View className="border-b py-2">
            <TextInput
              className="w-full text-xl font-bold px-2"
              onChangeText={(text: string) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={"none"}
            />
          </View>
          <View>
            <Button
              title="Sign Up"
              disabled={loading}
              onPress={() => signUpWithEmail()}
            />
          </View>

          <View className="items-center">
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text className="font-bold text-xl">
                Already Have An Account?
              </Text>
            </Pressable>
          </View>

          <View>
            <AppleAuth />
          </View>

          <View>
            <GoogleAuth />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SignUp
