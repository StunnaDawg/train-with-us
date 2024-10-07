import React, { useEffect, useState } from "react"
import { View, Text, Pressable, StyleSheet } from "react-native"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../../@types/navigation"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import EditProfileTopBar from "../../../components/TopBarEdit"

type LvlOptions =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Expert"
  | "Professional"

const ExperienceLvl = () => {
  const route = useRoute<RouteProp<RootStackParamList, "FitnessLevel">>()
  const userProfile = route.params.userProfile
  const navigation = useNavigation<NavigationType>()
  const [selectedLvl, setSelectedLvl] = useState<LvlOptions | string>("")
  const { user } = useAuth()

  const LvlOptions: LvlOptions[] = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert",
    "Professional",
  ]

  useEffect(() => {
    if (userProfile?.fitness_lvl) {
      setSelectedLvl(userProfile.fitness_lvl)
    }
  }, [userProfile])

  const handleSelectLvl = (lvl: LvlOptions) => {
    setSelectedLvl(lvl)
  }

  const handleUserUpdate = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ fitness_lvl: selectedLvl })
        .eq("id", user?.id)

      if (error) throw error

      navigation.goBack()
    } catch (error) {
      console.error("Failed to update fitness level:", error)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <EditProfileTopBar
        text="Experience Level"
        onSave={handleUserUpdate}
        primaryTextColor="text-gray-800"
      />
      <View className="flex-1 p-4">
        <Text className="text-lg font-semibold mb-4 text-gray-800">
          Select your fitness experience level:
        </Text>
        {LvlOptions.map((option, index) => (
          <Pressable
            key={index}
            onPress={() => handleSelectLvl(option)}
            className={`flex-row justify-between items-center p-4 mb-2 rounded-lg ${
              selectedLvl === option ? "bg-blue-100" : "bg-gray-100"
            }`}
          >
            <Text
              className={`text-base ${
                selectedLvl === option
                  ? "font-semibold text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {option}
            </Text>
            {selectedLvl === option && (
              <View className="w-4 h-4 bg-blue-500 rounded-full" />
            )}
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  )
}

export default ExperienceLvl
