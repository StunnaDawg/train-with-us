import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Alert,
} from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"
import { useAuth } from "../supabaseFunctions/authcontext"
import supabase from "../../lib/supabase"
import BackButton from "../components/BackButton"
import { Profile } from "../@types/supabaseTypes"
import useCurrentUser from "../supabaseFunctions/getFuncs/useCurrentUser"
import GenericButton from "../components/GenericButton"

type ActivitiesOption = string

const FitnessInterests = () => {
  const navigation = useNavigation<NavigationType>()
  const [selectedActivities, setSelectedActivities] = useState<
    ActivitiesOption[]
  >([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const { user } = useAuth()

  const handleSelectActivities = (activity: ActivitiesOption) => {
    if (!selectedActivities.includes(activity)) {
      setSelectedActivities([...selectedActivities, activity])
    } else {
      handleDeselectActivities(activity)
    }
  }

  const handleDeselectActivities = (activity: ActivitiesOption) => {
    setSelectedActivities(selectedActivities.filter((a) => a !== activity))
  }

  const handleUserUpdate = async () => {
    if (selectedActivities.length === 0) {
      Alert.alert("Please select at least one activity")
      return
    }
    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user?.id,
        activities: selectedActivities,
      })

      if (error) throw error

      navigation.navigate("EndOnBoarding")
    } catch (error) {
      console.log(error)
      Alert.alert("Error", "Failed to update profile. Please try again.")
    }
  }

  const ActivitiesOptions: ActivitiesOption[] = [
    "Aerobics 🏃‍♀️",
    "Boxing 🥊",
    "CrossFit 🏋️‍♂️",
    "Hyrox 💪",
    "Running 🏃",
    "Weightlifting 🏋️‍♀️",
    "Cycling 🚴",
    "Yoga 🧘",
    "Pilates 🧘‍♀️",
    "Powerlifting 🏋️‍♂️",
    "Basketball 🏀",
    "Bodybuilding 💪",
    "Calisthenics 🤸‍♂️",
    "Swimming 🏊",
    "Dance 💃",
    "Hiking 🥾",
    "Rock Climbing 🧗",
    "Rowing 🚣",
    "Martial Arts 🥋",
    "Soccer ⚽",
    "Tennis 🎾",
    "Golf ⛳",
    "Baseball ⚾",
    "Softball ⚾",
    "Football 🏈",
    "Rugby 🏉",
    "Hockey 🏒",
    "Mountain Biking 🚵",
    "Skiing 🎿",
    "Snowboarding 🏂",
    "Surfing 🏄",
    "Skateboarding 🛹",
    "Zumba 🕺",
    "Kickboxing 🥊",
    "Spin Class 🚴‍♂️",
    "Tai Chi 🧘‍♂️",
    "Stretching 🤸‍♀️",
    "HIIT 🔥",
    "TRX Training 🏋️",
    "Functional Training 🏋️‍♂️",
    "Trail Running 🏃‍♂️",
    "Obstacle Course Racing 🏅",
    "Stand-Up Paddleboarding (SUP) 🏄‍♂️",
    "Cross-Country Skiing 🎿",
    "Fencing 🤺",
    "Taekwondo 🥋",
    "Jiu-Jitsu 🥋",
    "Karate 🥋",
    "Judo 🥋",
    "Badminton 🏸",
    "Table Tennis 🏓",
    "Volleyball 🏐",
    "Cricket 🏏",
    "Handball 🤾‍♂️",
    "Figure Skating ⛸",
    "Track and Field 🏃‍♀️",
    "Climbing 🧗‍♂️",
    "Parkour 🏃‍♂️",
    "Cheerleading 🎀",
    "Gymnastics 🤸‍♀️",
    "Pole Dancing 💃",
    "Diving 🤿",
    "Water Polo 🤽‍♂️",
    "Wrestling 🤼‍♂️",
    "Racquetball 🎾",
    "Squash 🎾",
    "Frisbee 🥏",
    "Lacrosse 🥍",
    "Sailing ⛵",
    "Kayaking 🛶",
    "Canoeing 🛶",
    "Horseback Riding 🐎",
    "Archery 🏹",
  ]

  useEffect(() => {
    if (!user) return
    useCurrentUser(user?.id, setProfile)
  }, [user])

  useEffect(() => {
    if (profile && profile.activities) {
      setSelectedActivities(profile.activities)
    }
  }, [profile])

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex-1 px-4 py-6">
        <View className="flex-row items-center mb-6">
          <BackButton colour="white" />
          <Text className="flex-1 text-2xl font-bold text-white text-center mr-8">
            Fitness Interests
          </Text>
        </View>

        <Text className="text-lg text-white mb-4 text-center">
          Select your fitness interests
        </Text>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap justify-center">
            {ActivitiesOptions.map((activity, index) => {
              const isSelected = selectedActivities.includes(activity)
              return (
                <Pressable
                  onPress={() => handleSelectActivities(activity)}
                  key={index}
                  className={`m-1 px-3 py-2 rounded-full ${
                    isSelected ? "bg-yellow-400" : "bg-gray-700"
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      isSelected ? "text-primary-900" : "text-white"
                    }`}
                  >
                    {activity}
                  </Text>
                </Pressable>
              )
            })}
          </View>
        </ScrollView>

        <View className="mt-6 flex flex-row justify-center">
          <GenericButton
            text="Continue"
            buttonFunction={handleUserUpdate}
            colourDefault="bg-white"
            colourPressed="bg-yellow-300"
            borderColourDefault="border-transparent"
            borderColourPressed="border-yellow-400"
            textSize="text-lg"
            roundness="rounded-full"
            width={250}
            padding="py-4"
            textColour="text-gray-800"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default FitnessInterests
