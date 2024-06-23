import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { NavigationType, RootStackParamList } from "../../../@types/navigation"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import NextButton from "../../../components/NextButton"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import BackButton from "../../../components/BackButton"

type LvlOptions =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Expert"
  | "Professional"

const FitnessLevel = () => {
  const route = useRoute<RouteProp<RootStackParamList, "FitnessLevel">>()
  const userProfile = route.params.userProfile

  const navigation = useNavigation<NavigationType>()

  const [selectedLvl, setSelectedLvl] = useState<LvlOptions | string>("")
  const { user } = useAuth()

  const handleSelectLvl = (lvl: LvlOptions) => {
    setSelectedLvl(selectedLvl === lvl ? "Beginner" : lvl)
  }

  const handleUserUpdate = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ fitness_lvl: selectedLvl })
        .eq("id", user?.id)

      if (error) throw error

      // Navigate to the next preference page
      navigation.goBack()
    } catch (error) {
      console.error("Failed to update community preferences:", error)
    }
  }

  useEffect(() => {
    if (userProfile?.fitness_lvl) {
      setSelectedLvl(userProfile.fitness_lvl)
    }
  }, [userProfile])

  const LvlOptions: LvlOptions[] = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert",
    "Professional",
  ]

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="flex justify-center">
          <View>
            <View className="flex flex-row justify-between items-center mx-2">
              <BackButton />
              <Text className="font-bold text-lg">
                What are your fitness interests
              </Text>
              <View />
            </View>

            {LvlOptions.map((Lvl, index) => (
              <View
                key={index}
                className="w-full border-b flex flex-row justify-between items-center p-2"
              >
                <Text className="text-lg font-semibold">{Lvl}</Text>
                <BouncyCheckbox
                  isChecked={selectedLvl?.includes(Lvl)}
                  onPress={() => handleSelectLvl(Lvl)}
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

export default FitnessLevel
