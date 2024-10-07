import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import { NavigationType, RootStackParamList } from "../../../@types/navigation"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import NextButton from "../../../components/NextButton"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import EnhancedTextInput from "../../../components/TextInput"
import BackButton from "../../../components/BackButton"
import EditProfileTopBar from "../../../components/TopBarEdit"

type FitnessBucketListOptions =
  | "Run a 5K"
  | "Complete a Half-Marathon"
  | "Finish a Marathon"
  | "Compete in a Triathlon"
  | "Qualify for the Boston Marathon"
  | "Attend a Yoga Retreat"
  | "Master a Handstand in Yoga"
  | "Perform a Muscle-Up"
  | "Climb a Significant Mountain"
  | "Win a Bodybuilding Competition"
  | "Complete a Tough Mudder"
  | "Bench Press Your Own Weight"
  | "Deadlift Twice Your Body Weight"
  | "Squat 1.5 Times Your Body Weight"
  | "Complete 100 Push-Ups Without Stopping"
  | "Swim 2 Miles Non-Stop"
  | "Cycle 100 Miles in One Ride"
  | "Achieve a Black Belt in a Martial Art"
  | "Compete in an MMA Fight"
  | "Complete an Ironman Triathlon"

const FitnessBucketList = () => {
  const route = useRoute<RouteProp<RootStackParamList, "FitnessBucketList">>()
  const userProfile = route.params.userProfile
  const navigation = useNavigation<NavigationType>()
  const [bucketList, setBucketList] = useState<string>("")
  const { user } = useAuth()

  useEffect(() => {
    if (userProfile?.bucket_list) {
      setBucketList(userProfile.bucket_list)
    }
  }, [userProfile])

  const handleUserUpdate = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ bucket_list: bucketList })
        .eq("id", user?.id)

      if (error) throw error
      navigation.goBack()
    } catch (error) {
      console.error("Failed to update fitness bucket list:", error)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <EditProfileTopBar
        text="Your fitness bucket list"
        onSave={handleUserUpdate}
        saveText="Done"
        primaryTextColor="text-gray-800"
      />
      <View className="flex-1 p-4">
        <Text className="text-lg font-semibold mb-2 text-gray-800">
          Share your fitness goals
        </Text>
        <Text className="text-sm text-gray-600 mb-4">
          List some fitness achievements you'd like to accomplish in the future.
        </Text>
        <EnhancedTextInput
          text={bucketList}
          setText={setBucketList}
          label="Your Fitness Bucket List"
          placeholder="Run a marathon, master a handstand, climb Mount Kilimanjaro..."
          maxLength={200}
          multiline
          numberOfLines={4}
          inputStyle="h-36"
        />
        <TouchableOpacity
          onPress={handleUserUpdate}
          className="mt-6 bg-blue-500 py-3 px-6 rounded-full"
        >
          <Text className="text-white text-center font-semibold">
            Save Bucket List
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default FitnessBucketList
