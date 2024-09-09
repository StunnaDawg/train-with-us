import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native"
import React, { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { NavigationType } from "../../@types/navigation"
import GenericButton from "../../components/GenericButton"
import supabase from "../../../lib/supabase"
import CreateCommunityTopBar from "./components/TopBar"
import { useAuth } from "../../supabaseFunctions/authcontext"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { Profile } from "../../@types/supabaseTypes"
import showAlert from "../../utilFunctions/showAlert"

type ActvitiesOption = string

const ChooseCommunityActivities = () => {
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()
  const [selectedActvities, setSelectedActvities] = useState<ActvitiesOption[]>(
    []
  )
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)

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

  const handleCommunityUpdate = async () => {
    try {
      const { error } = await supabase.from("communities").upsert({
        id: currentUser?.community_created,
        community_tags: selectedActvities,
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
          buttonFunction={() => handleCommunityUpdate()}
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

export default ChooseCommunityActivities
