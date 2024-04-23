import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { NavigationType, TabNavigationType } from "../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import supabase from "../../lib/supabase"
import getUserId from "../supabaseFunctions/getFuncs/getUserId"

const Question4 = () => {
  const [currentId, setCurrentId] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigation<TabNavigationType>()

  useEffect(() => {
    getUserId(setCurrentId)
  }, [])

  const finishOnBoard = async () => {
    setLoading(true)
    if (currentId === "") return
    const { error } = await supabase
      .from("profiles")
      .update({ onboard: true })
      .eq("id", currentId)

    if (error) {
      console.log("Error updating onBoard status", error)
    }
    setLoading(false)
    navigation.navigate("Events")
  }
  return (
    <View className="flex flex-1 justify-center">
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <>
          <Text>Question4</Text>
          <Pressable onPress={async () => await finishOnBoard()}>
            <Text>Next</Text>
          </Pressable>
        </>
      )}
    </View>
  )
}

export default Question4
