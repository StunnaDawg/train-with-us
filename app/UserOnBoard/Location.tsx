import { View, Text, SafeAreaView } from "react-native"
import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import NextButton from "../components/NextButton"

type Locations = "Halifax"

const Location = () => {
  const navigation = useNavigation<NavigationType>()

  const [selectedLocation, setSelectedLocation] = useState<Locations>("Halifax")

  const handleSelectLocation = (Location: Locations) => {
    setSelectedLocation(selectedLocation === Location ? "Halifax" : Location)
  }
  const LocationOptions: Locations[] = ["Halifax"]
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-between">
        <View>
          <View className="flex flex-row justify-center">
            <View>
              <View>
                <Text className="text-lg font-bold">
                  What is your Location?
                </Text>
                <Text className="text-sm text-center">
                  You can change this later...
                </Text>
              </View>

              <View>
                {LocationOptions.map((Location, index) => (
                  <View
                    key={index}
                    className="flex flex-row justify-between p-2 items-center"
                  >
                    <Text className="text-lg font-semibold">{Location}</Text>
                    <BouncyCheckbox
                      disabled={true}
                      isChecked={selectedLocation === Location}
                      onPress={() => handleSelectLocation(Location)}
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Footer View to push the Next Button to the bottom */}
        <View className="flex flex-row justify-end p-4">
          <NextButton onPress={() => navigation.navigate("QuestionTwo")} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Location
