import { View, Text, Pressable } from "react-native"
import { FontAwesome6 } from "@expo/vector-icons"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../@types/navigation"
import showAlertFunc from "../utilFunctions/showAlertFunc"

type BackButtonProps = {
  colour?: string
  size?: number
}

const CancelButton = ({ colour, size }: BackButtonProps) => {
  const navigation = useNavigation<NavigationType>()

  const cancel = () => {
    showAlertFunc({
      title: "Go Back?",
      message: "Are you sure you want to cancel?",
      buttons: [
        {
          text: "Yes",
          onPress: () => navigation.goBack(),
        },
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
      ],
    })
  }

  return (
    <Pressable
      onPress={() => {
        cancel()
      }}
    >
      <FontAwesome6
        name="chevron-left"
        size={size ? size : 24}
        color={colour ? colour : "black"}
      />
    </Pressable>
  )
}

export default CancelButton
