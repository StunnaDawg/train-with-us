import { View, Text, SafeAreaView, StyleSheet } from "react-native"
import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import GenericButton from "../components/GenericButton"

type Locations = "Halifax"

const Location = () => {
  const navigation = useNavigation<NavigationType>()

  const [selectedLocation, setSelectedLocation] = useState<Locations>("Halifax")

  const handleSelectLocation = (Location: Locations) => {
    setSelectedLocation(selectedLocation === Location ? "Halifax" : Location)
  }
  const LocationOptions: Locations[] = ["Halifax"]
  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex-1 justify-between">
        <View>
          <View className="flex flex-row justify-center">
            <View>
              <View>
                <Text className="text-xl font-bold text-white">
                  What is your Location?
                </Text>
                <Text className="text-sm font-semibold text-center text-white">
                  You can always change this later!
                </Text>
                <Text className="text-xs text-center text-white">
                  More locations coming soon!
                </Text>
              </View>

              <View>
                {LocationOptions.map((Location, index) => (
                  <View key={index} style={styles.optionContainer}>
                    <Text style={styles.optionText}>{Location}</Text>
                    <BouncyCheckbox
                      fillColor="#FDE047"
                      disabled={true}
                      isChecked={selectedLocation === Location}
                      onPress={() => handleSelectLocation(Location)}
                      iconStyle={{ borderColor: "#FFFFFF" }}
                    />
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
          buttonFunction={() => navigation.navigate("QuestionTwo")}
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

export default Location
