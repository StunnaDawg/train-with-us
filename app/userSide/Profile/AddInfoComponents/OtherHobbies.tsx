import { View, Text, ScrollView, TextInput } from "react-native"
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

type HobbiesOptions =
  | "Gardening"
  | "Photography"
  | "Painting"
  | "Writing"
  | "Cooking"
  | "Baking"
  | "Woodworking"
  | "Knitting"
  | "Dancing"
  | "Playing Musical Instruments"
  | "Reading"
  | "Bird Watching"
  | "Fishing"
  | "Astronomy"
  | "Pottery Making"
  | "Sewing"
  | "Model Building"
  | "Scrapbooking"
  | "Drawing"
  | "Calligraphy"

const Hobbies = () => {
  const route = useRoute<RouteProp<RootStackParamList, "Hobbies">>()
  const userProfile = route.params.userProfile

  const navigation = useNavigation<NavigationType>()

  const [hobby, setHobby] = useState<string>("")

  // const [selectedHobbies, setSelectedHobbies] = useState<
  //   HobbiesOptions[] | string[]
  // >([])
  const { user } = useAuth()

  // const handleHobbies = (item: HobbiesOptions) => {
  //   if (selectedHobbies.includes(item)) {
  //     // Remove the item if it is already selected
  //     setSelectedHobbies(selectedHobbies.filter((m) => m !== item))
  //   } else {
  //     // Add the item only if there are less than 5 items already selected
  //     if (selectedHobbies.length < 5) {
  //       setSelectedHobbies([...selectedHobbies, item])
  //     }
  //   }
  // }

  const handleUserUpdate = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: user?.id, hobbies: hobby })

      if (error) throw error

      // Navigate to the next preference page
      navigation.goBack()
    } catch (error) {
      console.error("Failed to update community preferences:", error)
    }
  }

  // useEffect(() => {
  //   if (userProfile?.hobbies) {
  //     setSelectedHobbies(userProfile.hobbies)
  //   }
  // }, [userProfile])

  const HobbiesOptionsArray: HobbiesOptions[] = [
    "Gardening",
    "Photography",
    "Painting",
    "Writing",
    "Cooking",
    "Baking",
    "Woodworking",
    "Knitting",
    "Dancing",
    "Playing Musical Instruments",
    "Reading",
    "Bird Watching",
    "Fishing",
    "Astronomy",
    "Pottery Making",
    "Sewing",
    "Model Building",
    "Scrapbooking",
    "Drawing",
    "Calligraphy",
  ]

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="">
          <View>
            <View className="flex flex-row justify-between items-center">
              <View className="ml-2">
                <BackButton />
              </View>
              <Text className="font-bold text-lg">
                Non-Fitness related Hobbies
              </Text>
              <View />
            </View>

            <View className="flex flex-row justify-center">
              <EnhancedTextInput
                text={hobby}
                setText={setHobby}
                placeholder="I enjoy taking long walks on the beach"
              />
            </View>

            {/* {HobbiesOptionsArray.map((Hobbies, index) => (
              <View
                key={index}
                className="w-full border-b flex flex-row justify-between items-center p-2"
              >
                <Text className="text-sm font-semibold">{Hobbies}</Text>
                <BouncyCheckbox
                  isChecked={selectedHobbies.includes(Hobbies)}
                  onPress={() => handleHobbies(Hobbies)}
                />
              </View>
            ))} */}
          </View>
          <View className="mt-4 flex flex-row justify-end">
            <NextButton onPress={() => handleUserUpdate()} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Hobbies
