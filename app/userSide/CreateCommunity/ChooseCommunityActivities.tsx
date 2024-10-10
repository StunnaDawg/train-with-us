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
import { NavigationType } from "../../@types/navigation"
import supabase from "../../../lib/supabase"
import { useAuth } from "../../supabaseFunctions/authcontext"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { Profile } from "../../@types/supabaseTypes"
import GenericButton from "../../components/GenericButton"
import CreateCommunityTopBar from "./components/TopBar"
import showAlert from "../../utilFunctions/showAlert"

type ActivitiesOption = string

const ChooseCommunityActivities = () => {
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()
  const [selectedActivities, setSelectedActivities] = useState<
    ActivitiesOption[]
  >([])
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)

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

  const handleCommunityUpdate = async () => {
    try {
      const { error } = await supabase.from("communities").upsert({
        id: currentUser?.community_created,
        community_tags: selectedActivities,
      })
      if (error) throw error
      if (currentUser?.community_created) {
        navigation.navigate("AddNewCommunityPhotos", {
          communityId: currentUser?.community_created,
        })
      } else {
        showAlert({ title: "Error", message: "Community not found" })
      }
    } catch (error) {
      console.log(error)
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
    // ... (other activities)
  ]

  useEffect(() => {
    if (!user) return
    useCurrentUser(user.id, setCurrentUser)
  }, [user])

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <CreateCommunityTopBar
        text="Community Activities"
        functionProp={() => {
          if (currentUser?.community_created) {
            navigation.navigate("AddNewCommunityPhotos", {
              communityId: currentUser?.community_created,
            })
          }
        }}
      />

      <View className="flex-1 px-4 pt-4 pb-2">
        <Text className="text-lg text-white mb-4 text-center">
          Select activities that best represent your community
        </Text>

        <ScrollView
          className="flex-1 mb-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
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

        <View className=" flex flex-row justify-centermb-2">
          <GenericButton
            text="Continue"
            buttonFunction={handleCommunityUpdate}
            colourDefault="bg-white"
            colourPressed="bg-yellow-300"
            borderColourDefault="border-transparent"
            borderColourPressed="border-yellow-400"
            textSize="text-lg"
            roundness="rounded-full"
            width={300}
            padding="py-4"
            textColour="text-gray-800"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ChooseCommunityActivities
