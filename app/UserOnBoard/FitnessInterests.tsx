import { View, Text, TextInput, SafeAreaView, ScrollView } from "react-native"
import React from "react"
import NextButton from "../components/NextButton"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { NavigationType } from "../@types/navigation"
import { useAuth } from "../supabaseFunctions/authcontext"
import supabase from "../../lib/supabase"

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
  | null

const FitnessInterests = () => {
  const navigation = useNavigation<NavigationType>()

  const [selectedActvities, setSelectedActvities] = useState<ActvitiesOption[]>(
    ["Aerobics"]
  )
  const { user } = useAuth()

  const handleSelectActivities = (activity: ActvitiesOption) => {
    if (!selectedActvities.includes(activity)) {
      setSelectedActvities([...selectedActvities, activity])
    }
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
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="flex justify-center mx-12">
          <View className="items-start w-full">
            <View className="my-5">
              <Text className="font-bold text-2xl">
                What are your fitness interests
              </Text>
            </View>

            {ActvitiesOptions.map((Actvities, index) => (
              <View
                key={index}
                className="w-full border-b flex flex-row justify-between items-center p-2"
              >
                <Text className="text-xl font-semibold">{Actvities}</Text>
                <BouncyCheckbox
                  fillColor="blue"
                  unFillColor="#FFFFFF"
                  onPress={() => handleSelectActivities(Actvities)}
                />
              </View>
            ))}
          </View>
          <View className="mt-4 flex flex-row justify-end">
            <NextButton onPress={() => handleUserUpdate()} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default FitnessInterests
