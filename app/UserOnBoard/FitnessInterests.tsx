import { View, Text, TextInput, SafeAreaView, ScrollView } from "react-native"
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

type ActvitiesOption =
  | "CrossFit"
  | "Hyrox"
  | "Running"
  | "Weightlifting"
  | "Cycling"
  | "Yoga"
  | "Pilates"
  | "Powerlifting"
  | "Basketball"
  | "Bodybuilding"
  | "Calisthenics"
  | "Swimming"
  | "Aerobics"
  | "Boxing"
  | "Dance"
  | "Hiking"
  | string
  | null

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
      const { error } = await supabase
        .from("profiles")
        .update({
          activities: selectedActvities,
        })
        .eq("id", user?.id)

      if (error) throw error

      navigation.goBack()
    } catch (error) {
      console.log(error)
    }
  }

  const ActvitiesOptions: ActvitiesOption[] = [
    "Aerobics",
    "Boxing",
    "CrossFit",
    "Hyrox",
    "Running",
    "Weightlifting",
    "Cycling",
    "Yoga",
    "Pilates",
    "Powerlifting",
    "Basketball",
    "Bodybuilding",
    "Calisthenics",
    "Swimming",
    "Dance",
    "Hiking",
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
    <SafeAreaView className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex justify-center">
          <View className="flex flex-row justify-between items-center">
            <View className="mx-1">
              <BackButton />
            </View>
            <View>
              <Text className="font-bold text-xl">
                What are your fitness interests
              </Text>
            </View>
            <View />
          </View>

          {ActvitiesOptions.map((Actvities, index) => (
            <View
              key={index}
              className="w-full border-b flex flex-row justify-between items-center p-2"
            >
              <Text className="text-lg font-semibold">{Actvities}</Text>
              <BouncyCheckbox
                fillColor="blue"
                unFillColor="#FFFFFF"
                onPress={() => handleSelectActivities(Actvities)}
                isChecked={selectedActvities.includes(Actvities)}
              />
            </View>
          ))}
        </View>
        <View className="mt-4 flex flex-row justify-end">
          <NextButton onPress={() => handleUserUpdate()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default FitnessInterests
