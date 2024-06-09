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
import NextButton from "../components/NextButton"
import DateTimePicker from "@react-native-community/datetimepicker"
import DOBPicker from "../components/DOBPicker"
import supabase from "../../lib/supabase"
import { useAuth } from "../supabaseFunctions/authcontext"
import calculateAge from "../utilFunctions/calculateAge"

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
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-center mx-12">
        <View>
          <View className="items-start w-full">
            <View className="my-5">
              <Text className="font-bold text-lg">
                What's your date of birth?
              </Text>
            </View>

            <View>
              <DOBPicker date={date} setDate={setDate} />
            </View>
          </View>
          <View className="mt-4 flex flex-row justify-end">
            <NextButton onPress={() => handleUserUpdate()} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Question2
