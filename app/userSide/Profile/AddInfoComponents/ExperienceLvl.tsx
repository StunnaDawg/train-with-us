import { View, Text, ScrollView, StyleSheet } from "react-native"
import React, { useEffect, useState } from "react"
import { NavigationType, RootStackParamList } from "../../../@types/navigation"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import NextButton from "../../../components/NextButton"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import BackButton from "../../../components/BackButton"
import EditProfileTopBar from "../../../components/TopBarEdit"

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
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex-1 justify-between">
        <View>
          <EditProfileTopBar
            text="Experience Level"
            functionProp={handleUserUpdate}
          />

          <View>
            {LvlOptions.map((option, index) => (
              <View key={index} style={styles.optionContainer}>
                <Text style={styles.optionText}>{option}</Text>
                <BouncyCheckbox
                  fillColor="blue"
                  unFillColor="#FFFFFF"
                  isChecked={selectedLvl === option}
                  onPress={() => handleSelectLvl(option)}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerContainer: {
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subHeaderText: {
    fontSize: 14,
    textAlign: "center",
    color: "#FFFFFF",
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
})
export default FitnessLevel
