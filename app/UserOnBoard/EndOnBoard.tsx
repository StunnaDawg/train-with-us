import { View, Text, SafeAreaView } from "react-native"
import React from "react"
import GenericButton from "../components/GenericButton"
import supabase from "../../lib/supabase"
import { useAuth } from "../supabaseFunctions/authcontext"
import * as Updates from "expo-updates"

const EndOnBoard = () => {
  const { user } = useAuth()

  const finishOnBoard = async () => {
    if (!user?.id) return
    const { error } = await supabase
      .from("profiles")
      .update({ onboard: true })
      .eq("id", user?.id)

    if (error) throw error
    await Updates.reloadAsync()
  }
  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex-1">
        <View className="flex flex-row  m-9">
          <Text className="text-xl font-bold text-white">
            You're all ready!
          </Text>
        </View>
        <View className="flex flex-row mb-9 mx-9">
          <Text className="text-lg font-semibold text-white">
            Browse Event in your area and join the fun.
          </Text>
        </View>

        <View className="flex flex-row mb-9 mx-9">
          <Text className="text-lg font-semibold text-white">
            Connect with your community and stay up to date with events.
          </Text>
        </View>

        <View className="flex flex-row mb-9 mx-9">
          <Text className="text-lg font-semibold text-white">
            Connect with like-minded people and make new fitness friends.
          </Text>
        </View>
      </View>

      <View className="flex flex-row justify-center m-4">
        <GenericButton
          text="Jump In!"
          buttonFunction={() => finishOnBoard()}
          colourDefault="bg-white"
          colourPressed="bg-yellow-300"
          borderColourDefault="border-black"
          borderColourPressed="border-black"
          textSize="text-lg"
          roundness="rounded-lg"
          width={300}
          padding="p-2"
        />
      </View>
    </SafeAreaView>
  )
}

export default EndOnBoard
