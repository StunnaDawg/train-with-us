import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Alert,
  StyleSheet,
} from "react-native"
import React from "react"
import { useState } from "react"
import BouncyCheckbox from "react-native-bouncy-checkbox"

import { useAuth } from "../../../supabaseFunctions/authcontext"
import Sexuality from "../../../UserOnBoard/Sexuality"
import NextButton from "../../../components/NextButton"
import supabase from "../../../../lib/supabase"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import EditProfileTopBar from "../../../components/TopBarEdit"

type SexualityOption =
  | "Prefer not to say"
  | "Straight"
  | "Gay"
  | "Lesbian"
  | "Bisexual"
  | null

const SexualityEdit = () => {
  const navigation = useNavigation<NavigationType>()
  const [selectedSexuality, setSelectedSexuality] =
    useState<SexualityOption>("Prefer not to say")

  const handleSelectSexuality = (Sexuality: SexualityOption) => {
    setSelectedSexuality(selectedSexuality === Sexuality ? null : Sexuality)
  }
  const { user } = useAuth()

  const showAlert = () =>
    Alert.alert(
      "Missing Information",
      "Please Select an Option.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    )

  const handleUserUpdate = async () => {
    if (selectedSexuality === null) {
      showAlert()
      return
    }
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          sexuality: selectedSexuality,
        })
        .eq("id", user?.id)

      if (error) throw error

      navigation.goBack()
    } catch (error) {
      console.log(error)
    }
  }
  const SexualityOptions: SexualityOption[] = [
    "Prefer not to say",
    "Straight",
    "Gay",
    "Lesbian",
  ]
  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex-1 justify-between">
        <View>
          <EditProfileTopBar text="Sexuality" functionProp={handleUserUpdate} />

          <View>
            {SexualityOptions.map((option, index) => (
              <View key={index} style={styles.optionContainer}>
                <Text style={styles.optionText}>{option}</Text>
                <BouncyCheckbox
                  fillColor="blue"
                  unFillColor="#FFFFFF"
                  isChecked={selectedSexuality === option}
                  onPress={() => handleSelectSexuality(option)}
                />
                {/* {option === "Specify other..." &&
                  selectedGender === "Specify other..." && (
                    <TextInput
                      value={specifyInput}
                      onChangeText={setSpecifyInput}
                      placeholder="Specify your gender here..."
                      className="h-9 border-2 w-48 rounded p-1"
                    />
                  )} */}
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
export default SexualityEdit
