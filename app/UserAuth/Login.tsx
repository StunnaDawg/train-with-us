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
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import supabase from "../../lib/supabase"
import { NavigationType } from "../@types/navigation"
import { SafeAreaView } from "react-native-safe-area-context"

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

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation<NavigationType>()

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
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
              title="Log in"
              disabled={loading}
              onPress={() => signInWithEmail()}
            />
          </View>

          <View className="items-center">
            <Pressable onPress={() => navigation.navigate("SignUp")}>
              <Text className="font-bold text-xl">Don't Have an Account?</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
})

export default Login
