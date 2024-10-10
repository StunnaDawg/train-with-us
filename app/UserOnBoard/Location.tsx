import { View, Text, SafeAreaView, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"
import GenericButton from "../components/GenericButton"
import { Ionicons } from "@expo/vector-icons"

type Locations = "Halifax"

const Location = () => {
  const navigation = useNavigation<NavigationType>()
  const [selectedLocation, setSelectedLocation] = useState<Locations>("Halifax")

  const handleSelectLocation = (location: Locations) => {
    setSelectedLocation(location)
  }

  const LocationOptions: Locations[] = ["Halifax"]

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex-1 justify-between py-10 px-6">
        <View>
          <Text className="text-3xl font-bold text-white mb-4 text-center">
            What is your Location?
          </Text>
          <Text className="text-lg text-white mb-2 text-center">
            You can always change this later!
          </Text>
          <Text className="text-sm text-gray-400 mb-8 text-center">
            More locations coming soon!
          </Text>

          <View className="space-y-4">
            {LocationOptions.map((location, index) => (
              <TouchableOpacity
                key={index}
                className={`flex-row items-center justify-between p-4 rounded-lg ${
                  selectedLocation === location
                    ? "bg-yellow-500"
                    : "bg-gray-700"
                }`}
                onPress={() => handleSelectLocation(location)}
              >
                <Text
                  className={`text-lg font-semibold ${
                    selectedLocation === location
                      ? "text-primary-900"
                      : "text-white"
                  }`}
                >
                  {location}
                </Text>
                {selectedLocation === location && (
                  <Ionicons name="checkmark-circle" size={24} color="#07182d" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View>
          <GenericButton
            text="Continue"
            buttonFunction={() => navigation.navigate("QuestionTwo")}
            colourDefault="bg-white"
            colourPressed="bg-yellow-300"
            borderColourDefault="border-transparent"
            borderColourPressed="border-yellow-400"
            textSize="text-lg"
            roundness="rounded-full"
            width={250}
            padding="py-4"
            textColour="text-gray-800"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Location
