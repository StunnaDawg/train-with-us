import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { NavigationType } from "../@types/navigation"
import NextButton from "../components/NextButton"
import supabase from "../../lib/supabase"
import { useAuth } from "../supabaseFunctions/authcontext"

type GenderOption = "Male" | "Female" | "Non-Binary" | "Specify other..." | null

const Question3 = () => {
  const navigation = useNavigation<NavigationType>()

  const [selectedGender, setSelectedGender] = useState<GenderOption>("Male")
  const [specifyInput, setSpecifyInput] = useState<string>("")
  const [displayOnProfile, setDisplayOnProfile] = useState<boolean>(false)

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
    if (selectedGender === null) {
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

      navigation.navigate("Sexuality")
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
    <SafeAreaView className="flex-1">
      <View className="flex justify-center mx-12">
        <View className="items-start w-full">
          <View className="my-5">
            <Text className="font-bold text-2xl">
              Which Gender best describes you?
            </Text>
          </View>

          {genderOptions.map((gender, index) => (
            <View
              key={index}
              className="w-full border-b flex flex-row justify-between items-center p-2"
            >
              <Text className="text-lg font-semibold">{gender}</Text>
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
          <View className="flex flex-row mt-2">
            <BouncyCheckbox
              isChecked={displayOnProfile}
              onPress={() =>
                displayOnProfile
                  ? setDisplayOnProfile(false)
                  : setDisplayOnProfile(true)
              }
            />
            <Text className="font-bold text-xl">Visible on Profile</Text>
          </View>
        </View>
        <View className="mt-4 flex flex-row justify-end">
          <NextButton onPress={() => handleUserUpdate()} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Question3
