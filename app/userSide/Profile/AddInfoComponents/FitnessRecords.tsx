import React, { useState } from "react"
import { View, Text, TextInput, SafeAreaView, ScrollView } from "react-native"
import GenericButton from "../../../components/GenericButton"

// Define a type for the state and setter tuple
type PRRecord = [string, string, React.Dispatch<React.SetStateAction<string>>]

const FitnessRecords = () => {
  const [backSquat, setBackSquat] = useState<string>("")
  const [frontSquat, setFrontSquat] = useState<string>("")
  const [benchPress, setBenchPress] = useState<string>("")
  const [shoulderPress, setShoulderPress] = useState<string>("")
  const [deadlift, setDeadlift] = useState<string>("")
  const [clean, setClean] = useState<string>("")
  const [powerClean, setPowerClean] = useState<string>("")
  const [snatch, setSnatch] = useState<string>("")
  const [powerSnatch, setPowerSnatch] = useState<string>("")

  const savePrs = () => {
    // Save PRs to the database
  }
  const prRecords: PRRecord[] = [
    ["Back Squat PR", backSquat, setBackSquat],
    ["Front Squat PR", frontSquat, setFrontSquat],
    ["Bench Press PR", benchPress, setBenchPress],
    ["Shoulder Press PR", shoulderPress, setShoulderPress],
    ["Deadlift PR", deadlift, setDeadlift],
    ["Clean PR", clean, setClean],
    ["Power Clean PR", powerClean, setPowerClean],
    ["Snatch PR", snatch, setSnatch],
    ["Power Snatch PR", powerSnatch, setPowerSnatch],
  ]

  return (
    <SafeAreaView className="flex-1 items-center justify-center p-4">
      <Text className="text-2xl font-bold mb-4">Fitness Records</Text>
      <ScrollView className="w-full px-4">
        <View>
          {prRecords.map(([label, value, setValue], index) => (
            <View key={index} className="mb-4">
              <Text className="mb-2 text-lg font-semibold">{label}</Text>
              <TextInput
                value={value}
                onChangeText={setValue}
                placeholder="Enter PR"
                keyboardType="numeric"
                className="border border-gray-300 rounded-lg p-2"
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <View className="pt-2">
        <GenericButton
          text="Save"
          buttonFunction={savePrs}
          borderColourDefault="black"
          borderColourPressed="gray-200"
          colourDefault="bg-blue-500"
          colourPressed="bg-blue-200"
          roundness="rounded-xl"
          textSize="text-xl"
        />
      </View>
    </SafeAreaView>
  )
}

export default FitnessRecords
