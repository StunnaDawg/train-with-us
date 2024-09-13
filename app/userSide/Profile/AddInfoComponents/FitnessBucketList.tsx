import { View, Text, ScrollView } from "react-native"
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

  // const [selectedBucketList, setSelectedBucketList] = useState<
  //   FitnessBucketListOptions[] | string[]
  // >([])
  const { user } = useAuth()

  // const handleBucketList = (item: FitnessBucketListOptions) => {
  //   if (selectedBucketList.includes(item)) {
  //     // Remove the item if it is already selected
  //     setSelectedBucketList(selectedBucketList.filter((m) => m !== item))
  //   } else {
  //     // Add the item only if there are less than 5 items already selected
  //     if (selectedBucketList.length < 5) {
  //       setSelectedBucketList([...selectedBucketList, item])
  //     }
  //   }
  // }

  const handleUserUpdate = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ bucket_list: bucketList })
        .eq("id", user?.id)

      if (error) throw error

      // Navigate to the next preference page
      navigation.goBack()
    } catch (error) {
      console.error("Failed to update community preferences:", error)
    }
  }

  // useEffect(() => {
  //   if (userProfile?.bucket_list) {
  //     setSelectedBucketList(userProfile.bucket_list)
  //   }
  // }, [userProfile])

  // const FitnessBucketOptions: FitnessBucketListOptions[] = [
  //   "Run a 5K",
  //   "Complete a Half-Marathon",
  //   "Finish a Marathon",
  //   "Compete in a Triathlon",
  //   "Qualify for the Boston Marathon",
  //   "Attend a Yoga Retreat",
  //   "Master a Handstand in Yoga",
  //   "Perform a Muscle-Up",
  //   "Climb a Significant Mountain",
  //   "Win a Bodybuilding Competition",
  //   "Complete a Tough Mudder",
  //   "Bench Press Your Own Weight",
  //   "Deadlift Twice Your Body Weight",
  //   "Squat 1.5 Times Your Body Weight",
  //   "Swim 2 Miles Non-Stop",
  //   "Cycle 100 Miles in One Ride",
  //   "Achieve a Black Belt in a Martial Art",
  //   "Compete in an MMA Fight",
  //   "Complete an Ironman Triathlon",
  // ]

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View>
        <View>
          <EditProfileTopBar
            text="Your fitness bucket list"
            functionProp={async () => await handleUserUpdate()}
          />

          <View className="flex flex-row justify-center">
            <EnhancedTextInput
              text={bucketList}
              setText={setBucketList}
              placeholder="Looking for a great community!"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default FitnessBucketList
