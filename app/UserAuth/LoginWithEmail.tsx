import {
  View,
  Text,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import React, { useState } from "react"
import { TextInput } from "react-native"
import supabase from "../../lib/supabase"
import * as Updates from "expo-updates"
import GenericButton from "../components/GenericButton"
import BackButton from "../components/BackButton"

const LoginWithEmail = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function signInWithEmail() {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    await Updates.reloadAsync()
  }
  return (
    <SafeAreaView className="flex-1 " style={{ backgroundColor: "#07182d" }}>
      <View className="mx-2">
        <BackButton colour="white" size={50} />
      </View>
      <KeyboardAvoidingView
        className="flex-1 justify-center "
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View className="border-b py-2 mx-2">
          <TextInput
            placeholderTextColor={"white"}
            className="w-full text-xl font-bold px-2 text-white"
            onChangeText={(text: string) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
          />
        </View>
        <View className="border-b py-2 mx-2">
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
            textSize="text-2xl"
            width={300}
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
