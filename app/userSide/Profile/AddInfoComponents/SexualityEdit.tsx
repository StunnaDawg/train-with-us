import { View, Text, TextInput, SafeAreaView, Alert } from "react-native"
import React from "react"
import { useState } from "react"
import BouncyCheckbox from "react-native-bouncy-checkbox"

import { useAuth } from "../../../supabaseFunctions/authcontext"
import Sexuality from "../../../UserOnBoard/Sexuality"
import NextButton from "../../../components/NextButton"
import supabase from "../../../../lib/supabase"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"

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
  const [displayOnProfile, setDisplayOnProfile] = useState<boolean>(false)

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
    <SafeAreaView className="flex-1">
      <View className="flex justify-center mx-12">
        <View className="items-start w-full">
          <View className="my-5">
            <Text className="font-bold text-2xl">What is your Sexuality?</Text>
          </View>

          {SexualityOptions.map((Sexuality, index) => (
            <View
              key={index}
              className="w-full border-b flex flex-row justify-between items-center p-2"
            >
              <Text className="text-lg font-semibold">{Sexuality}</Text>
              <BouncyCheckbox
                fillColor="blue"
                unFillColor="#FFFFFF"
                isChecked={selectedSexuality === Sexuality}
                onPress={() => handleSelectSexuality(Sexuality)}
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
          <NextButton
            onPress={async () => {
              await handleUserUpdate()
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SexualityEdit
