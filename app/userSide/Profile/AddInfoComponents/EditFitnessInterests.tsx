import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native"
import React, { useEffect } from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { useState } from "react"
import { NavigationType, RootStackParamList } from "../../../@types/navigation"

import supabase from "../../../../lib/supabase"

import EditProfileTopBar from "../../../components/TopBarEdit"

type ActvitiesOption = string

const EditFitnessInterests = () => {
  const navigation = useNavigation<NavigationType>()
  const route =
    useRoute<RouteProp<RootStackParamList, "EditFitnessInterests">>()
  const userProfile = route.params.userProfile
  const [selectedActvities, setSelectedActvities] = useState<ActvitiesOption[]>(
    []
  )

  const handleSelectActivities = (activity: ActvitiesOption) => {
    if (!selectedActvities.includes(activity)) {
      setSelectedActvities([...selectedActvities, activity])
    } else {
      handleDeselectActivities(activity)
    }
  }

  const handleDeselectActivities = (activity: ActvitiesOption) => {
    const index = selectedActvities.indexOf(activity)
    if (index > -1) {
      selectedActvities.splice(index, 1)
    }
    setSelectedActvities([...selectedActvities])
  }

  const handleUserUpdate = async () => {
    try {
      const { error } = await supabase.from("profiles").upsert({
        id: userProfile.id,
        activities: selectedActvities,
      })

      if (error) throw error

      navigation.goBack()
    } catch (error) {
      console.log(error)
    }
  }

  const ActvitiesOptions: ActvitiesOption[] = [
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
    if (userProfile && userProfile.activities?.length) {
      setSelectedActvities(userProfile.activities)
    }
  }, [userProfile])

  return (
    <SafeAreaView className="flex-1 bg-white">
      <EditProfileTopBar
        text="Edit your Fitness Interests"
        saveText="Save"
        onSave={handleUserUpdate}
        primaryTextColor="text-gray-800"
      />
      <ScrollView showsVerticalScrollIndicator={false} className="px-4">
        <Text className="text-lg font-semibold mb-2 text-gray-800 mt-1">
          Select your fitness interests
        </Text>
        <Text className="text-sm text-gray-600 mb-4">
          Choose the activities you enjoy or want to try. This helps us connect
          you with like-minded individuals.
        </Text>
        <View className="flex flex-row justify-center flex-wrap">
          {ActvitiesOptions.map((activity, index) => {
            const isSelected = selectedActvities.includes(activity)
            return (
              <Pressable
                onPress={() => handleSelectActivities(activity)}
                key={index}
                className={`border-2 rounded-full p-2 m-1 ${
                  isSelected
                    ? "bg-blue-500 border-blue-600"
                    : "bg-white border-gray-300"
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    isSelected ? "text-white" : "text-gray-800"
                  }`}
                >
                  {activity}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditFitnessInterests
