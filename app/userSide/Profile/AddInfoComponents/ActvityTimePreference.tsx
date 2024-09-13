import { View, Text, TextInput, SafeAreaView, StyleSheet } from "react-native"
import React from "react"
import NextButton from "../../../components/NextButton"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { NavigationType } from "../../../@types/navigation"
import supabase from "../../../../lib/supabase"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import BackButton from "../../../components/BackButton"
import EditProfileTopBar from "../../../components/TopBarEdit"

type TimeOption =
  | "Morning"
  | "Afternoon"
  | "Evening"
  | "Weekday Preferred"
  | "Weekends Preferred"
  | null

const ActivityTimePreference = () => {
  const navigation = useNavigation<NavigationType>()

  const [selectedTime, setSelectedTime] = useState<TimeOption>("Morning")
  const { user } = useAuth()

  const handleSelectTime = (Time: TimeOption) => {
    setSelectedTime(selectedTime === Time ? null : Time)
  }

  const handleUserUpdate = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ actvitiy_time: selectedTime })
        .eq("id", user?.id)

      if (error) throw error

      // Navigate to the next preference page
      navigation.goBack()
    } catch (error) {
      console.error("Failed to update community preferences:", error)
    }
  }
  const TimeOptions: TimeOption[] = [
    "Morning",
    "Afternoon",
    "Evening",
    "Weekday Preferred",
    "Weekends Preferred",
  ]
  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex-1 justify-between">
        <View>
          <EditProfileTopBar
            text="Workout Time"
            functionProp={handleUserUpdate}
          />

          <View>
            {TimeOptions.map((time, index) => (
              <View key={index} style={styles.optionContainer}>
                <Text style={styles.optionText}>{time}</Text>
                <BouncyCheckbox
                  fillColor="blue"
                  unFillColor="#FFFFFF"
                  isChecked={selectedTime === time}
                  onPress={() => handleSelectTime(time)}
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
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
})

export default ActivityTimePreference
