import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from "react-native"
import React, { useState } from "react"
import BackButton from "../components/BackButton"
import GenericButton from "../components/GenericButton"
import supabase from "../../lib/supabase"
import * as Updates from "expo-updates"

const SignUpWithEmail = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function signUpWithEmail() {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
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
        <View className="border-b py-2 mx-2">
          <TextInput
            placeholderTextColor={"white"}
            className="w-full text-lg font-bold px-2 text-white"
            onChangeText={(text: string) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
          />
        </View>
        <View className="border-b py-2 mx-2">
          <TextInput
            placeholderTextColor={"white"}
            className="w-full text-lg font-bold px-2 text-white"
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
