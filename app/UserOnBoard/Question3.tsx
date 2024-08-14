import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { NavigationType } from "../@types/navigation"
import supabase from "../../lib/supabase"
import { useAuth } from "../supabaseFunctions/authcontext"
import GenericButton from "../components/GenericButton"

type GenderOption = "Male" | "Female" | "Non-Binary" | "Specify other..." | null

const Question3 = () => {
  const navigation = useNavigation<NavigationType>()

  const [selectedGender, setSelectedGender] = useState<GenderOption>("Male")
  const [specifyInput, setSpecifyInput] = useState<string>("")

  const { user, userProfile } = useAuth()

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
    if (selectedGender === null || userProfile === null) {
      showAlert()
      return
    }
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          gender: selectedGender,
        })
        .eq("id", user?.id)

      if (error) throw error

      navigation.navigate("FitnessInterests", {
        userProfile: null,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelectGender = (gender: GenderOption) => {
    setSelectedGender(selectedGender === gender ? null : gender)
  }
  const genderOptions: GenderOption[] = [
    "Male",
    "Female",
    "Non-Binary",
    "Specify other...",
  ]
  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex-1 justify-between">
        <View>
          <View className="flex flex-row justify-center">
            <View>
              <View>
                <Text className="text-xl font-bold text-white">
                  Which gender do you identify with?
                </Text>
              </View>

              <View>
                {genderOptions.map((gender, index) => (
                  <View key={index} style={styles.optionContainer}>
                    <Text style={styles.optionText}>{gender}</Text>
                    <BouncyCheckbox
                      fillColor="blue"
                      unFillColor="#FFFFFF"
                      isChecked={selectedGender === gender}
                      onPress={() => handleSelectGender(gender)}
                    />
                    {gender === "Specify other..." &&
                      selectedGender === "Specify other..." && (
                        <TextInput
                          value={specifyInput}
                          onChangeText={setSpecifyInput}
                          placeholder="Specify your gender here..."
                          className="h-9 border-2 w-48 rounded p-1"
                        />
                      )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="flex flex-row justify-center m-4">
        <GenericButton
          text="Continue"
          buttonFunction={() => handleUserUpdate()}
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
export default Question3
