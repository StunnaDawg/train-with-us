import React, { useState } from "react"
import { View, Text, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import NextButton from "../components/NextButton"
import supabase from "../../lib/supabase"
import { useAuth } from "../supabaseFunctions/authcontext"
import { NavigationType } from "../@types/navigation"

// Define the types for community options
type CommunitiesOption =
  | "Gym Based Groups"
  | "Outdoor Activities"
  | "Beginner Groups"
  | "Advanced Athlete Groups"
  | "Wellness Groups"
  | null

const CommunityPreference = () => {
  const navigation = useNavigation<NavigationType>()
  const [selectedCommunities, setSelectedCommunities] =
    useState<CommunitiesOption | null>(null)
  const { user } = useAuth()

  // Function to handle updating the user's community preferences in the database
  const handleUserUpdate = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: user?.id, community_preference: [selectedCommunities] })

      if (error) throw error

      // Navigate to the next preference page
      // navigation.navigate("ActivityTimePreference")
    } catch (error) {
      console.error("Failed to update community preferences:", error)
    }
  }

  // Function to handle the selection of communities
  const handleSelectCommunities = (community: CommunitiesOption) => {
    // Toggle community selection or set it to null if it's already selected
    setSelectedCommunities(selectedCommunities === community ? null : community)
  }

  // List of available community options
  const CommunitiesOptions: CommunitiesOption[] = [
    "Gym Based Groups",
    "Outdoor Activities", // Corrected typo
    "Beginner Groups",
    "Advanced Athlete Groups",
    "Wellness Groups",
  ]

  return (
    <SafeAreaView className="flex-1">
      <View className="flex justify-center mx-12">
        <View className="items-start w-full">
          <View className="my-5">
            <Text className="font-bold text-2xl">
              What type of Communities are you interested in?
            </Text>
          </View>

          {CommunitiesOptions.map((community, index) => (
            <View
              key={index}
              className="w-full border-b flex flex-row justify-between items-center p-2"
            >
              <Text className="text-lg font-semibold">{community}</Text>
              <BouncyCheckbox
                fillColor="blue"
                unFillColor="#FFFFFF"
                isChecked={selectedCommunities === community}
                onPress={() => handleSelectCommunities(community)}
              />
            </View>
          ))}
        </View>
        <View className="mt-4 flex flex-row justify-end">
          <NextButton onPress={handleUserUpdate} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default CommunityPreference
