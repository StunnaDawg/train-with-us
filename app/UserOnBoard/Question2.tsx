import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native"
import React, { useEffect, useState } from "react"
import { NavigationType } from "../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import DOBPicker from "../components/DOBPicker"
import supabase from "../../lib/supabase"
import { useAuth } from "../supabaseFunctions/authcontext"
import calculateAge from "../utilFunctions/calculateAge"
import GenericButton from "../components/GenericButton"

const Question2 = () => {
  const [date, setDate] = useState(new Date())
  const [ageState, setAge] = useState<number | null>(null)
  const navigation = useNavigation<NavigationType>()
  const { user } = useAuth()

  const showAlert = () =>
    Alert.alert(
      "Hey!",
      "You must be 18 years or older to use this app.",
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
    if (ageState !== null && ageState >= 18) {
      console.log("age here", ageState)
      try {
        console.log("age herssse", ageState)
        const { error } = await supabase
          .from("profiles")
          .update({
            birthday: date,
          })
          .eq("id", user?.id)

        if (error) throw error

        navigation.navigate("QuestionThree")
      } catch (error) {
        console.log(error)
      }
    } else {
      showAlert()
    }
  }

  useEffect(() => {
    console.log("date", date)
    setAge(calculateAge(date.toString()))
  }, [date])

  useEffect(() => {
    console.log("ageState", ageState)
  }, [ageState])
  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex-1 flex flex-row justify-center ">
        <View>
          <View className="w-full">
            <View className="flex flex-row justify-center my-5">
              <Text className="font-bold text-white text-xl">
                What's your date of birth?
              </Text>
            </View>

            <View className="bg-white rounded-xl">
              <DOBPicker date={date} setDate={setDate} />
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

export default Question2
