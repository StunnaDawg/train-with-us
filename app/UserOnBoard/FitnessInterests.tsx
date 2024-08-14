import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native"
import React, { useEffect } from "react"
import NextButton from "../components/NextButton"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { NavigationType } from "../@types/navigation"
import { useAuth } from "../supabaseFunctions/authcontext"
import supabase from "../../lib/supabase"
import BackButton from "../components/BackButton"
import { Profile } from "../@types/supabaseTypes"
import useCurrentUser from "../supabaseFunctions/getFuncs/useCurrentUser"
import GenericButton from "../components/GenericButton"

type ActvitiesOption = string

const FitnessInterests = () => {
  const navigation = useNavigation<NavigationType>()
  const [selectedActvities, setSelectedActvities] = useState<ActvitiesOption[]>(
    []
  )
  const [profile, setProfile] = useState<Profile | null>(null)
  const { user } = useAuth()

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
        id: user?.id,
        activities: selectedActvities,
      })

      if (error) throw error
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
    "Fencing 🤺",
  ]

  useEffect(() => {
    if (!user) return
    useCurrentUser(user?.id, setProfile)
  }, [user])

  useEffect(() => {
    if (profile && profile.activities) {
      setSelectedActvities(profile.activities)
      console.log(profile.activities)
    }
  }, [profile])

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex flex-row justify-between items-center my-1">
        <View className="mx-1">
          <BackButton colour="white" />
        </View>
        <View>
          <Text className="font-bold text-white text-xl">
            What are your fitness interests
          </Text>
        </View>
        <View />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-row justify-center flex-wrap">
          {ActvitiesOptions.map((activity, index) => {
            const isSelected = selectedActvities.includes(activity)
            return (
              <Pressable
                onPress={() => handleSelectActivities(activity)}
                key={index}
                className={`border-2 rounded-full p-1 text-center mx-1 my-1 ${
                  isSelected
                    ? "bg-yellow-300 border-yellow-400 shadow-xl"
                    : "bg-white border-gray-300"
                }`}
              >
                <Text className={`text-xs font-semibold`}>{activity}</Text>
              </Pressable>
            )
          })}
        </View>
      </ScrollView>
      <View className="flex flex-row justify-center m-4">
        <GenericButton
          text="Continue"
          buttonFunction={() => handleUserUpdate()}
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

export default FitnessInterests
