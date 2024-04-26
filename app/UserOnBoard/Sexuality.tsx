import { View, Text, TextInput, SafeAreaView } from "react-native"
import React from "react"
import NextButton from "../components/NextButton"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { NavigationType } from "../@types/navigation"

type GenderOption =
  | "Prefer not to say"
  | "Straight"
  | "Gay"
  | "Lesbian"
  | "Bisexual"
  | null

const Sexuality = () => {
  const navigation = useNavigation<NavigationType>()

  const [selectedGender, setSelectedGender] =
    useState<GenderOption>("Prefer not to say")
  const [displayOnProfile, setDisplayOnProfile] = useState<boolean>(false)

  const handleSelectGender = (gender: GenderOption) => {
    setSelectedGender(selectedGender === gender ? null : gender)
  }
  const genderOptions: GenderOption[] = [
    "Prefer not to say",
    "Straight",
    "Gay",
    "Lesbian",
  ]
  return (
    <SafeAreaView className="flex-1">
      <View className="flex justify-center mx-12">
        <View className="items-start w-full">
          <View className="my-5">
            <Text className="font-bold text-2xl">What is your Sexuality?</Text>
          </View>

          {genderOptions.map((gender, index) => (
            <View
              key={index}
              className="w-full border-b flex flex-row justify-between items-center p-2"
            >
              <Text className="text-lg font-semibold">{gender}</Text>
              <BouncyCheckbox
                isChecked={selectedGender === gender}
                onPress={() => handleSelectGender(gender)}
              />
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
          <NextButton onPress={() => navigation.navigate("FitnessInterests")} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Sexuality
