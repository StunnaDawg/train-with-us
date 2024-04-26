import { View, Text, Pressable, SafeAreaView, TextInput } from "react-native"
import React, { useState } from "react"
import { NavigationType } from "../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import NextButton from "../components/NextButton"
import DateTimePicker from "@react-native-community/datetimepicker"
import DOBPicker from "../components/DOBPicker"

const Question2 = () => {
  const [date, setDate] = useState(new Date())
  const navigation = useNavigation<NavigationType>()
  return (
    <SafeAreaView className="flex-1">
      <View className="flex justify-center mx-12">
        <View className="items-start w-full">
          <View className="my-5">
            <Text className="font-bold text-2xl">
              What's your date of birth?
            </Text>
          </View>

          <View>
            <DOBPicker date={date} setDate={setDate} />
          </View>
        </View>
        <View className="mt-4 flex flex-row justify-end">
          <NextButton onPress={() => navigation.navigate("QuestionThree")} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Question2
